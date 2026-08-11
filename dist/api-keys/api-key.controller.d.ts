import { ApiKeysService } from './api-key.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';
export declare class ApiKeysController {
    private readonly apiKeysService;
    constructor(apiKeysService: ApiKeysService);
    create(createApiKeyDto: CreateApiKeyDto): Promise<{
        apiKey: import("mongoose").Document<unknown, {}, import("./api-key.schema").ApiKeyDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./api-key.schema").ApiKey & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        plaintextKey: string;
    }>;
    findAll(): Promise<import("./api-key.schema").ApiKeyDocument[]>;
    findById(id: string): Promise<import("./api-key.schema").ApiKeyDocument>;
    update(id: string, updateApiKeyDto: UpdateApiKeyDto): Promise<import("./api-key.schema").ApiKeyDocument>;
    rotate(id: string): Promise<{
        apiKey: import("mongoose").Document<unknown, {}, import("./api-key.schema").ApiKeyDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./api-key.schema").ApiKey & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        plaintextKey: string;
    }>;
    revoke(id: string): Promise<import("./api-key.schema").ApiKeyDocument>;
}
