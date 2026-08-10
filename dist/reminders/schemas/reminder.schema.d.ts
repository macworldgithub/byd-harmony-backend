import { Document } from 'mongoose';
export type ReminderDocument = Reminder & Document;
export declare class Reminder {
    clientId: number;
    clientName: string;
    title: string;
    dueAt: Date;
    done: number;
}
export declare const ReminderSchema: import("mongoose").Schema<Reminder, import("mongoose").Model<Reminder, any, any, any, any, any, Reminder>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Reminder, Document<unknown, {}, Reminder, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Reminder & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    clientId?: import("mongoose").SchemaDefinitionProperty<number, Reminder, Document<unknown, {}, Reminder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Reminder & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    clientName?: import("mongoose").SchemaDefinitionProperty<string, Reminder, Document<unknown, {}, Reminder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Reminder & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, Reminder, Document<unknown, {}, Reminder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Reminder & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    dueAt?: import("mongoose").SchemaDefinitionProperty<Date, Reminder, Document<unknown, {}, Reminder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Reminder & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    done?: import("mongoose").SchemaDefinitionProperty<number, Reminder, Document<unknown, {}, Reminder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Reminder & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Reminder>;
