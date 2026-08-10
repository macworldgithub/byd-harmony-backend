import { Document, Types } from 'mongoose';
import { Location } from '../../locations/schemas/location.schema';
export type CustomerDocument = Customer & Document;
export declare class Customer {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    suburb: string;
    state: string;
    postcode: string;
    dateOfBirth: string;
    licenceNumber: string;
    preferredLocationId: Location;
    lifecycleStage: string;
    source: string;
    consentSms: boolean;
    consentEmail: boolean;
    consentPhone: boolean;
    notes: string;
    aiSummary: string;
    aiSummaryAt: Date;
    isDeleted: boolean;
}
export declare const CustomerSchema: import("mongoose").Schema<Customer, import("mongoose").Model<Customer, any, any, any, any, any, Customer>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Customer, Document<unknown, {}, Customer, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Customer & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    firstName?: import("mongoose").SchemaDefinitionProperty<string, Customer, Document<unknown, {}, Customer, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Customer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    lastName?: import("mongoose").SchemaDefinitionProperty<string, Customer, Document<unknown, {}, Customer, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Customer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, Customer, Document<unknown, {}, Customer, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Customer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    phone?: import("mongoose").SchemaDefinitionProperty<string, Customer, Document<unknown, {}, Customer, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Customer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    address?: import("mongoose").SchemaDefinitionProperty<string, Customer, Document<unknown, {}, Customer, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Customer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    suburb?: import("mongoose").SchemaDefinitionProperty<string, Customer, Document<unknown, {}, Customer, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Customer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    state?: import("mongoose").SchemaDefinitionProperty<string, Customer, Document<unknown, {}, Customer, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Customer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    postcode?: import("mongoose").SchemaDefinitionProperty<string, Customer, Document<unknown, {}, Customer, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Customer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    dateOfBirth?: import("mongoose").SchemaDefinitionProperty<string, Customer, Document<unknown, {}, Customer, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Customer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    licenceNumber?: import("mongoose").SchemaDefinitionProperty<string, Customer, Document<unknown, {}, Customer, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Customer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    preferredLocationId?: import("mongoose").SchemaDefinitionProperty<Location, Customer, Document<unknown, {}, Customer, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Customer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    lifecycleStage?: import("mongoose").SchemaDefinitionProperty<string, Customer, Document<unknown, {}, Customer, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Customer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    source?: import("mongoose").SchemaDefinitionProperty<string, Customer, Document<unknown, {}, Customer, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Customer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    consentSms?: import("mongoose").SchemaDefinitionProperty<boolean, Customer, Document<unknown, {}, Customer, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Customer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    consentEmail?: import("mongoose").SchemaDefinitionProperty<boolean, Customer, Document<unknown, {}, Customer, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Customer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    consentPhone?: import("mongoose").SchemaDefinitionProperty<boolean, Customer, Document<unknown, {}, Customer, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Customer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string, Customer, Document<unknown, {}, Customer, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Customer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    aiSummary?: import("mongoose").SchemaDefinitionProperty<string, Customer, Document<unknown, {}, Customer, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Customer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    aiSummaryAt?: import("mongoose").SchemaDefinitionProperty<Date, Customer, Document<unknown, {}, Customer, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Customer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isDeleted?: import("mongoose").SchemaDefinitionProperty<boolean, Customer, Document<unknown, {}, Customer, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Customer & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Customer>;
