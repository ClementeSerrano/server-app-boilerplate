import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { OpenAIService } from '../openai/openai.service';
import { UserService } from 'src/users/users.service';

import {
  Conversation,
  ConversationDocument,
} from './schemas/conversation.schema';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { BuildPromptDto } from './dto/build-prompt.dto';
import { ChatDto } from './dto/chat.dto';
import { ConversationUserRole } from './conversations.types';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectModel(Conversation.name)
    private readonly conversationModel: Model<Conversation>,
    private openaiService: OpenAIService,
    private userService: UserService,
  ) {}

  /**
   * Retrieves a conversation from the database by its ID.
   */
  public async findById(_id: string): Promise<ConversationDocument | null> {
    return this.conversationModel.findById(_id).exec();
  }

  /**
   * Creates a new conversation and saves it to the database.
   */
  public async create(
    createConversationDto: CreateConversationDto,
  ): Promise<ConversationDocument> {
    const createdConversation = new this.conversationModel(
      createConversationDto,
    );

    return createdConversation.save();
  }

  /**
   * Handles a chat request, sending the user's prompt to the OpenAI Chat API and returning the
   * assistant's response.
   * @returns The completion response and corresponding conversation ID.
   */
  public async chat(
    chatDto: ChatDto,
  ): Promise<{ response: string; conversationId: string }> {
    let conversationId = chatDto.conversationId;

    // Create a new conversation if no conversationId is provided
    if (!conversationId) {
      const newConversation = await this.create({ userId: chatDto.userId });

      conversationId = newConversation._id.toString();
    }

    const conversation = await this.findById(conversationId);

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    const userPreferences = await this.userService.findPreferences(
      chatDto.userId,
    );

    const prompt = this.buildPrompt({
      basePrompt: chatDto.prompt,
      userPreferences,
    });

    const response = await this.openaiService.createChatCompletion(
      prompt,
      conversation.messages,
    );

    // Save the user's message and the assistant's response to the conversation
    await this.addMessageToConversation(conversationId, 'user', prompt);
    await this.addMessageToConversation(conversationId, 'assistant', response);

    return { response, conversationId };
  }

  /**
   * Adds a new message to an existing conversation, given the conversation ID, role (ConversationUserRole), and message content.
   * @returns The updated conversation.
   */
  private async addMessageToConversation(
    conversationId: string,
    role: ConversationUserRole,
    content: string,
  ): Promise<Conversation> {
    const conversation = await this.findById(conversationId);

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    conversation.messages.push({ role, content });

    return await conversation.save();
  }

  /**
   * Builds a prompt by combining the user preferences and the base prompt.
   */
  private buildPrompt(buildPromptDto: BuildPromptDto): string {
    const { basePrompt, userPreferences } = buildPromptDto;

    let prompt = '';

    if (userPreferences && userPreferences.length > 0) {
      prompt += `My preferences are ${userPreferences.join(', ')}.`;
    }

    prompt += ` ${basePrompt}`;

    return prompt;
  }
}
