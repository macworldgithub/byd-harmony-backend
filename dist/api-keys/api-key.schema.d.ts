import { Document } from 'mongoose';
export type ApiKeyDocument = ApiKey & Document;
export declare class ApiKey {
    name: string;
    keyHash: string;
    keyPrefix: string;
    role: string;
    locationId: string;
    department: string;
    isActive: boolean;
    scopes: string[];
    webhookUrl: string;
    webhookSecret: string;
    retryStrategy: string;
    maxRetries: number;
    lastUsedAt: Date;
    createdById: string;
}
export declare const ApiKeySchema: import("mongoose").Schema<ApiKey, import("mongoose").Model<ApiKey, any, any, any, any, any, ApiKey>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ApiKey, Document<unknown, {}, ApiKey, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ApiKey & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, ApiKey, Document<unknown, {}, ApiKey, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ApiKey & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    keyHash?: import("mongoose").SchemaDefinitionProperty<string, ApiKey, Document<unknown, {}, ApiKey, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ApiKey & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    keyPrefix?: import("mongoose").SchemaDefinitionProperty<string, ApiKey, Document<unknown, {}, ApiKey, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ApiKey & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    role?: import("mongoose").SchemaDefinitionProperty<string, ApiKey, Document<unknown, {}, ApiKey, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ApiKey & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    locationId?: import("mongoose").SchemaDefinitionProperty<string, ApiKey, Document<unknown, {}, ApiKey, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ApiKey & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    department?: import("mongoose").SchemaDefinitionProperty<string, ApiKey, Document<unknown, {}, ApiKey, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ApiKey & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, ApiKey, Document<unknown, {}, ApiKey, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ApiKey & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    scopes?: import("mongoose").SchemaDefinitionProperty<string[], ApiKey, Document<unknown, {}, ApiKey, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ApiKey & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    webhookUrl?: import("mongoose").SchemaDefinitionProperty<string, ApiKey, Document<unknown, {}, ApiKey, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ApiKey & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    webhookSecret?: import("mongoose").SchemaDefinitionProperty<string, ApiKey, Document<unknown, {}, ApiKey, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ApiKey & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    retryStrategy?: import("mongoose").SchemaDefinitionProperty<string, ApiKey, Document<unknown, {}, ApiKey, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ApiKey & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    maxRetries?: import("mongoose").SchemaDefinitionProperty<number, ApiKey, Document<unknown, {}, ApiKey, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ApiKey & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    lastUsedAt?: import("mongoose").SchemaDefinitionProperty<Date, ApiKey, Document<unknown, {}, ApiKey, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ApiKey & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    createdById?: import("mongoose").SchemaDefinitionProperty<string, ApiKey, Document<unknown, {}, ApiKey, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ApiKey & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, ApiKey>;
