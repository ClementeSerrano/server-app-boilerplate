import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChatCompletionRequestMessage } from 'openai';

import { OpenAIService } from 'src/openai/openai.service';
import { UserService } from 'src/users/users.service';
import {
  Conversation,
  ConversationDocument,
} from './schemas/conversation.schema';
import { Message, MessageDocument } from './schemas/message.schema';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { PrepareMessagesDto } from './dtos/prepare-messages.dto';
import { ChatDto } from './dtos/chat.dto';
import { FindConversationsDto } from './dtos/find-conversations.dto';
import { CreateMessageDto } from './dtos/create-message.dto';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectModel(Conversation.name)
    private readonly conversationModel: Model<Conversation>,
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,
    private openaiService: OpenAIService,
    private userService: UserService,
  ) {}

  /**
   * Retrieves all conversations from the database given a search criteria.
   */
  public async findAll(
    findAllConversationsDto: FindConversationsDto,
  ): Promise<ConversationDocument[]> {
    return this.conversationModel.find(findAllConversationsDto).exec();
  }

  /**
   * Retrieves a conversation from the database by its ID.
   */
  public async findById(_id: string): Promise<ConversationDocument | null> {
    return this.conversationModel.findById(_id).exec();
  }

  /**
   * Retrieves all messages of a given conversation.
   */
  public async findMessages(
    conversationId: string,
  ): Promise<MessageDocument[]> {
    return this.messageModel.find({ conversationId }).exec();
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
   * Creates a new message for a an existing conversation, given the conversation ID, role (ConversationUserRole), and message content.
   */
  public async createMessage(
    createMessageDto: CreateMessageDto,
  ): Promise<Message> {
    const createdMessage = new this.messageModel(createMessageDto);

    return createdMessage.save();
  }

  /**
   * Handles a chat request, sending the user's prompt to the OpenAI Chat API and returning the
   * assistant's response.
   * @returns The completion response and corresponding conversation ID.
   */
  public async chat(
    chatDto: ChatDto,
  ): Promise<{ response: string; conversationId: string }> {
    const prompt = chatDto.prompt;
    const userId = chatDto.userId;
    let conversationId = chatDto.conversationId;

    // Create a new conversation if no conversationId is provided
    if (!conversationId) {
      const newConversation = await this.create({ userId });

      conversationId = newConversation._id.toString();
    }

    const conversation = await this.findById(conversationId);

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    const userPreferences = await this.userService.findPreferences(userId);
    const conversationMessages = await this.findMessages(conversationId);
    const userLocation = chatDto.location;

    const messages = this.prepareMessages({
      conversationMessages,
      userPreferences,
      userLocation,
    });

    const response = await this.openaiService.createChatCompletion(
      prompt,
      messages,
    );

    // Save the user's message and the assistant's response to the conversation
    await this.createMessage({ conversationId, role: 'user', content: prompt });
    await this.createMessage({
      conversationId,
      role: 'assistant',
      content: response,
    });

    return { response, conversationId };
  }

  /**
   * Prepares the messages to be send for a chat completion based on the user preferences and
   * previous messages in the conversation.
   */
  private prepareMessages(
    prepareMessagesDto: PrepareMessagesDto,
  ): ChatCompletionRequestMessage[] {
    const { userPreferences, conversationMessages, userLocation } =
      prepareMessagesDto;

    let messages: ChatCompletionRequestMessage[] = [];

    if (userPreferences && userPreferences.length > 0) {
      messages = [
        {
          role: 'user',
          content: `My preferences are ${userPreferences.join(', ')}.`,
        },
      ];
    }

    if (userLocation) {
      messages = [
        ...messages,
        {
          role: 'user',
          content: `My location is: latitude: ${userLocation.latitude}, longitude: ${userLocation.longitude} and altitude: ${userLocation.altitude}.`,
        },
      ];
    }

    if (conversationMessages.length > 0) {
      messages = [
        ...messages,
        ...conversationMessages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      ];
    }

    return messages;
  }
}
