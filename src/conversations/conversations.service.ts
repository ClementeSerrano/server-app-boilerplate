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
import { ChatArgs } from './dtos/args/chat.args';
import { FindConversationsDto } from './dtos/find-conversations.dto';
import { CreateMessageDto } from './dtos/create-message.dto';
import { LocationService } from 'src/location/location.service';
import { ActivityChatArgs } from './dtos/args/activity-chat.args';
import { ACTIVITY_CHAT_PROMPTS } from './constants/activity-chat.constants';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectModel(Conversation.name)
    private readonly conversationModel: Model<Conversation>,
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,

    private openaiService: OpenAIService,
    private userService: UserService,
    private locationService: LocationService,
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
  public async chat(chatDto: ChatArgs): Promise<Conversation> {
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
    let locationContext;

    if (chatDto.location) {
      locationContext = await this.locationService.getLocationContext({
        latitude: chatDto.location.latitude,
        longitude: chatDto.location.longitude,
      });
    }

    const messages = this.prepareMessages({
      conversationMessages,
      userPreferences,
      locationContext,
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

    return conversation;
  }

  /**
   * Handles an activity recommendation chat request sending the user's prompt to the OpenAI Chat API and returning the
   * assistant's response.
   * @returns The completion response and corresponding conversation ID.
   */
  public async activityChat(
    activityChatDto: ActivityChatArgs,
  ): Promise<Conversation> {
    const activityType = activityChatDto.activityType;
    const userId = activityChatDto.userId;
    let conversationId = activityChatDto.conversationId;

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
    let locationContext;

    if (activityChatDto.location) {
      locationContext = await this.locationService.getLocationContext({
        latitude: activityChatDto.location.latitude,
        longitude: activityChatDto.location.longitude,
      });
    }

    const messages = this.prepareMessages({
      conversationMessages: [],
      userPreferences,
      locationContext,
    });

    const prompt = ACTIVITY_CHAT_PROMPTS[activityType];

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

    return conversation;
  }

  /**
   * Prepares the messages to be send for a chat completion based on the user preferences and
   * previous messages in the conversation.
   */
  private prepareMessages(
    prepareMessagesDto: PrepareMessagesDto,
  ): ChatCompletionRequestMessage[] {
    const { userPreferences, conversationMessages, locationContext } =
      prepareMessagesDto;

    let messages: ChatCompletionRequestMessage[] = [];

    if (conversationMessages.length > 0) {
      messages = [
        ...messages,
        ...conversationMessages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      ];
    }

    if (userPreferences && userPreferences.length > 0) {
      messages = [
        {
          role: 'user',
          content: `My preferences are ${userPreferences.join(', ')}.`,
        },
      ];
    }

    if (locationContext) {
      messages = [
        ...messages,
        {
          role: 'user',
          content: `I am located in: ${locationContext.street} ${locationContext.houseNumber}, ${locationContext.suburb}, ${locationContext.city}, ${locationContext.country}`,
        },
        {
          role: 'user',
          content: `My local time is: ${locationContext.localTime}`,
        },
        {
          role: 'user',
          content: `The weather conditions are:\n - Main description: ${locationContext.weather.description}.\n - Current temperature: ${locationContext.weather.temp} Celsius (feels like ${locationContext.weather.tempFeelsLike}).\n - Max temperature of the day: ${locationContext.weather.tempMax} Celsius.\n - Min temperature of the day: ${locationContext.weather.tempMin} Celsius.\n - Cloudiness: ${locationContext.weather.cloudiness}%.\n - Wind speed: ${locationContext.weather.windSpeed} meters/second.`,
        },
      ];
    }

    return messages;
  }
}
