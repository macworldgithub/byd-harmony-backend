import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { WebhookEvent, WebhookEventDocument } from './webhook-event.schema';

@Injectable()
export class WebhookEventService {
  constructor(
    @InjectModel(WebhookEvent.name)
    private webhookEventModel: Model<WebhookEventDocument>,
  ) {}

  /**
   * Creates a new event with status 'pending' and nextRetryAt = now.
   */
  async create(
    apiKeyId: MongooseSchema.Types.ObjectId | string,
    event: string,
    payload: Record<string, any>,
  ): Promise<WebhookEventDocument> {
    const newEvent = new this.webhookEventModel({
      apiKeyId,
      event,
      payload,
      status: 'pending',
      nextRetryAt: new Date(),
    });
    return newEvent.save();
  }

  /**
   * Sets status 'delivered', stores responseCode.
   */
  async markDelivered(
    id: string,
    responseCode: number,
  ): Promise<WebhookEventDocument | null> {
    return this.webhookEventModel.findByIdAndUpdate(
      id,
      {
        status: 'delivered',
        responseCode,
        lastAttemptAt: new Date(),
      },
      { new: true },
    ).exec();
  }

  /**
   * Increments attempts, sets status 'failed', stores error + nextRetryAt for backoff.
   */
  async markFailed(
    id: string,
    error: string,
    responseCode: number,
    nextRetryAt: Date,
  ): Promise<WebhookEventDocument | null> {
    return this.webhookEventModel.findByIdAndUpdate(
      id,
      {
        status: 'failed',
        error,
        responseCode,
        nextRetryAt,
        lastAttemptAt: new Date(),
        $inc: { attempts: 1 },
      },
      { new: true },
    ).exec();
  }

  /**
   * Sets status 'skipped' (used when apiKey has no webhookUrl).
   */
  async markSkipped(id: string): Promise<WebhookEventDocument | null> {
    return this.webhookEventModel.findByIdAndUpdate(
      id,
      { status: 'skipped' },
      { new: true },
    ).exec();
  }

  /**
   * Returns all docs where status='pending' AND nextRetryAt <= now (for retry worker).
   */
  async getPendingDue(): Promise<WebhookEventDocument[]> {
    return this.webhookEventModel.find({
      status: 'pending',
      nextRetryAt: { $lte: new Date() },
    }).exec();
  }

  /**
   * Returns all events for a given key (for audit log).
   */
  async findByApiKey(
    apiKeyId: MongooseSchema.Types.ObjectId | string,
  ): Promise<WebhookEventDocument[]> {
    return this.webhookEventModel.find({ apiKeyId: apiKeyId as any }).exec();
  }
}
