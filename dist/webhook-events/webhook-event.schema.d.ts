import { Document, Schema as MongooseSchema } from 'mongoose';
export type WebhookEventDocument = WebhookEvent & Document;
export declare class WebhookEvent {
    apiKeyId: MongooseSchema.Types.ObjectId;
    event: string;
    payload: Record<string, any>;
    status: string;
    attempts: number;
    lastAttemptAt: Date;
    nextRetryAt: Date;
    responseCode: number;
    error: string;
}
export declare const WebhookEventSchema: MongooseSchema<WebhookEvent, import("mongoose").Model<WebhookEvent, any, any, any, any, any, WebhookEvent>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, WebhookEvent, Document<unknown, {}, WebhookEvent, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<WebhookEvent & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    apiKeyId?: import("mongoose").SchemaDefinitionProperty<MongooseSchema.Types.ObjectId, WebhookEvent, Document<unknown, {}, WebhookEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WebhookEvent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    event?: import("mongoose").SchemaDefinitionProperty<string, WebhookEvent, Document<unknown, {}, WebhookEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WebhookEvent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    payload?: import("mongoose").SchemaDefinitionProperty<Record<string, any>, WebhookEvent, Document<unknown, {}, WebhookEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WebhookEvent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, WebhookEvent, Document<unknown, {}, WebhookEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WebhookEvent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    attempts?: import("mongoose").SchemaDefinitionProperty<number, WebhookEvent, Document<unknown, {}, WebhookEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WebhookEvent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    lastAttemptAt?: import("mongoose").SchemaDefinitionProperty<Date, WebhookEvent, Document<unknown, {}, WebhookEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WebhookEvent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    nextRetryAt?: import("mongoose").SchemaDefinitionProperty<Date, WebhookEvent, Document<unknown, {}, WebhookEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WebhookEvent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    responseCode?: import("mongoose").SchemaDefinitionProperty<number, WebhookEvent, Document<unknown, {}, WebhookEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WebhookEvent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    error?: import("mongoose").SchemaDefinitionProperty<string, WebhookEvent, Document<unknown, {}, WebhookEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WebhookEvent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, WebhookEvent>;
