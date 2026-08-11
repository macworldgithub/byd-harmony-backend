export declare class CreateApiKeyDto {
    name: string;
    role?: string;
    locationId?: string;
    department?: string;
    isActive?: boolean;
    scopes?: string[];
    webhookUrl?: string;
    webhookSecret?: string;
    retryStrategy?: string;
    maxRetries?: number;
    createdById?: string;
}
