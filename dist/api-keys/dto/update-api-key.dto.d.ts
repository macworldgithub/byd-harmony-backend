import { CreateApiKeyDto } from './create-api-key.dto';
declare const UpdateApiKeyDto_base: import("@nestjs/common").Type<Partial<Pick<CreateApiKeyDto, "name" | "isActive" | "role" | "locationId" | "department" | "scopes" | "webhookUrl" | "webhookSecret" | "retryStrategy" | "maxRetries">>>;
export declare class UpdateApiKeyDto extends UpdateApiKeyDto_base {
}
export {};
