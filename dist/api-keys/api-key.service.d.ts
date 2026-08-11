import { Model } from 'mongoose';
import { ApiKey, ApiKeyDocument } from './api-key.schema';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';
import { WebhookEventService } from '../webhook-events/webhook-event.service';
export declare class ApiKeysService {
    private apiKeyModel;
    private readonly webhookEventService;
    constructor(apiKeyModel: Model<ApiKeyDocument>, webhookEventService: WebhookEventService);
    private generateKey;
    create(dto: CreateApiKeyDto): Promise<{
        apiKey: import("mongoose").Document<unknown, {}, ApiKeyDocument, {}, import("mongoose").DefaultSchemaOptions> & ApiKey & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        plaintextKey: string;
    }>;
    findAll(): Promise<ApiKeyDocument[]>;
    findById(id: string): Promise<ApiKeyDocument>;
    findByHash(keyHash: string): Promise<ApiKeyDocument>;
    rotate(id: string): Promise<{
        apiKey: import("mongoose").Document<unknown, {}, ApiKeyDocument, {}, import("mongoose").DefaultSchemaOptions> & ApiKey & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        plaintextKey: string;
    }>;
    update(id: string, dto: UpdateApiKeyDto): Promise<ApiKeyDocument>;
    revoke(id: string): Promise<ApiKeyDocument>;
    updateLastUsed(id: string): Promise<void>;
}
