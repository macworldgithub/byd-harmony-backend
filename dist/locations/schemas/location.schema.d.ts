import { Document } from 'mongoose';
export type LocationDocument = Location & Document;
export declare class Location {
    name: string;
    type: string;
    address: string;
    suburb: string;
    state: string;
    postcode: string;
    phone: string;
    email: string;
    capacity: number;
    isActive: boolean;
}
export declare const LocationSchema: import("mongoose").Schema<Location, import("mongoose").Model<Location, any, any, any, any, any, Location>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Location, Document<unknown, {}, Location, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Location & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Location, Document<unknown, {}, Location, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Location & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<string, Location, Document<unknown, {}, Location, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Location & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    address?: import("mongoose").SchemaDefinitionProperty<string, Location, Document<unknown, {}, Location, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Location & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    suburb?: import("mongoose").SchemaDefinitionProperty<string, Location, Document<unknown, {}, Location, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Location & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    state?: import("mongoose").SchemaDefinitionProperty<string, Location, Document<unknown, {}, Location, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Location & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    postcode?: import("mongoose").SchemaDefinitionProperty<string, Location, Document<unknown, {}, Location, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Location & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    phone?: import("mongoose").SchemaDefinitionProperty<string, Location, Document<unknown, {}, Location, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Location & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, Location, Document<unknown, {}, Location, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Location & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    capacity?: import("mongoose").SchemaDefinitionProperty<number, Location, Document<unknown, {}, Location, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Location & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Location, Document<unknown, {}, Location, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Location & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Location>;
