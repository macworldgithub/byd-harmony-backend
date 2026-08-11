import { Model, Schema as MongooseSchema } from 'mongoose';
import { WebhookEventDocument } from './webhook-event.schema';
export declare class WebhookEventService {
    private webhookEventModel;
    constructor(webhookEventModel: Model<WebhookEventDocument>);
    create(apiKeyId: MongooseSchema.Types.ObjectId | string, event: string, payload: Record<string, any>): Promise<WebhookEventDocument>;
    markDelivered(id: string, responseCode: number): Promise<WebhookEventDocument | null>;
    markFailed(id: string, error: string, responseCode: number, nextRetryAt: Date): Promise<WebhookEventDocument | null>;
    markSkipped(id: string): Promise<WebhookEventDocument | null>;
    getPendingDue(): Promise<WebhookEventDocument[]>;
    findByApiKey(apiKeyId: MongooseSchema.Types.ObjectId | string): Promise<WebhookEventDocument[]>;
}
