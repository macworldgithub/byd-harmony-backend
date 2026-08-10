import { Document, Types } from 'mongoose';
import { Customer } from '../../customers/schemas/customer.schema';
export type VehicleDocument = Vehicle & Document;
export declare class Vehicle {
    customerId: Customer;
    vin: string;
    rego: string;
    make: string;
    model: string;
    year: number;
    colour: string;
    odometer: number;
    odometerUpdatedAt: Date;
    status: string;
    disposedAt: Date;
    disposalNotes: string;
    deliveredAt: Date;
    nextServiceDue: Date;
    warrantyExpiry: Date;
    isDeleted: boolean;
}
export declare const VehicleSchema: import("mongoose").Schema<Vehicle, import("mongoose").Model<Vehicle, any, any, any, any, any, Vehicle>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Vehicle, Document<unknown, {}, Vehicle, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    customerId?: import("mongoose").SchemaDefinitionProperty<Customer, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    vin?: import("mongoose").SchemaDefinitionProperty<string, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    rego?: import("mongoose").SchemaDefinitionProperty<string, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    make?: import("mongoose").SchemaDefinitionProperty<string, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    model?: import("mongoose").SchemaDefinitionProperty<string, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    year?: import("mongoose").SchemaDefinitionProperty<number, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    colour?: import("mongoose").SchemaDefinitionProperty<string, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    odometer?: import("mongoose").SchemaDefinitionProperty<number, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    odometerUpdatedAt?: import("mongoose").SchemaDefinitionProperty<Date, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    disposedAt?: import("mongoose").SchemaDefinitionProperty<Date, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    disposalNotes?: import("mongoose").SchemaDefinitionProperty<string, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    deliveredAt?: import("mongoose").SchemaDefinitionProperty<Date, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    nextServiceDue?: import("mongoose").SchemaDefinitionProperty<Date, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    warrantyExpiry?: import("mongoose").SchemaDefinitionProperty<Date, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isDeleted?: import("mongoose").SchemaDefinitionProperty<boolean, Vehicle, Document<unknown, {}, Vehicle, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Vehicle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Vehicle>;
