import { Document, Types } from 'mongoose';
import { Customer } from '../../customers/schemas/customer.schema';
import { Vehicle } from '../../vehicles/schemas/vehicle.schema';
import { Location } from '../../locations/schemas/location.schema';
import { Booking } from '../../bookings/schemas/booking.schema';
import { User } from '../../users/schemas/user.schema';
export type JobCardDocument = JobCard & Document;
export declare class JobCardItem {
    _id: Types.ObjectId;
    type: string;
    description: string;
    quantity: number;
    unitCost: number;
    totalCost: number;
    partNumber: string;
    technicianId: User;
    createdAt: Date;
}
export declare const JobCardItemSchema: import("mongoose").Schema<JobCardItem, import("mongoose").Model<JobCardItem, any, any, any, any, any, JobCardItem>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, JobCardItem, Document<unknown, {}, JobCardItem, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<JobCardItem & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    _id?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, JobCardItem, Document<unknown, {}, JobCardItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCardItem & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<string, JobCardItem, Document<unknown, {}, JobCardItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCardItem & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, JobCardItem, Document<unknown, {}, JobCardItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCardItem & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    quantity?: import("mongoose").SchemaDefinitionProperty<number, JobCardItem, Document<unknown, {}, JobCardItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCardItem & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    unitCost?: import("mongoose").SchemaDefinitionProperty<number, JobCardItem, Document<unknown, {}, JobCardItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCardItem & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    totalCost?: import("mongoose").SchemaDefinitionProperty<number, JobCardItem, Document<unknown, {}, JobCardItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCardItem & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    partNumber?: import("mongoose").SchemaDefinitionProperty<string, JobCardItem, Document<unknown, {}, JobCardItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCardItem & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    technicianId?: import("mongoose").SchemaDefinitionProperty<User, JobCardItem, Document<unknown, {}, JobCardItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCardItem & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, JobCardItem, Document<unknown, {}, JobCardItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCardItem & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, JobCardItem>;
export declare class JobCard {
    orderNumber: string;
    bookingId: Booking;
    customerId: Customer;
    vehicleId: Vehicle;
    locationId: Location;
    technicianId: User;
    status: string;
    priority: string;
    serviceType: string;
    workRequired: string;
    diagnosis: string;
    odometerIn: number;
    odometerOut: number;
    estimatedCost: number;
    actualCost: number;
    labourTotal: number;
    partsTotal: number;
    startedAt: Date;
    completedAt: Date;
    items: JobCardItem[];
    isDeleted: boolean;
}
export declare const JobCardSchema: import("mongoose").Schema<JobCard, import("mongoose").Model<JobCard, any, any, any, any, any, JobCard>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, JobCard, Document<unknown, {}, JobCard, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<JobCard & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    orderNumber?: import("mongoose").SchemaDefinitionProperty<string, JobCard, Document<unknown, {}, JobCard, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCard & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    bookingId?: import("mongoose").SchemaDefinitionProperty<Booking, JobCard, Document<unknown, {}, JobCard, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCard & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    customerId?: import("mongoose").SchemaDefinitionProperty<Customer, JobCard, Document<unknown, {}, JobCard, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCard & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    vehicleId?: import("mongoose").SchemaDefinitionProperty<Vehicle, JobCard, Document<unknown, {}, JobCard, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCard & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    locationId?: import("mongoose").SchemaDefinitionProperty<Location, JobCard, Document<unknown, {}, JobCard, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCard & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    technicianId?: import("mongoose").SchemaDefinitionProperty<User, JobCard, Document<unknown, {}, JobCard, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCard & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, JobCard, Document<unknown, {}, JobCard, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCard & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    priority?: import("mongoose").SchemaDefinitionProperty<string, JobCard, Document<unknown, {}, JobCard, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCard & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    serviceType?: import("mongoose").SchemaDefinitionProperty<string, JobCard, Document<unknown, {}, JobCard, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCard & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    workRequired?: import("mongoose").SchemaDefinitionProperty<string, JobCard, Document<unknown, {}, JobCard, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCard & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    diagnosis?: import("mongoose").SchemaDefinitionProperty<string, JobCard, Document<unknown, {}, JobCard, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCard & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    odometerIn?: import("mongoose").SchemaDefinitionProperty<number, JobCard, Document<unknown, {}, JobCard, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCard & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    odometerOut?: import("mongoose").SchemaDefinitionProperty<number, JobCard, Document<unknown, {}, JobCard, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCard & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    estimatedCost?: import("mongoose").SchemaDefinitionProperty<number, JobCard, Document<unknown, {}, JobCard, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCard & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    actualCost?: import("mongoose").SchemaDefinitionProperty<number, JobCard, Document<unknown, {}, JobCard, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCard & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    labourTotal?: import("mongoose").SchemaDefinitionProperty<number, JobCard, Document<unknown, {}, JobCard, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCard & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    partsTotal?: import("mongoose").SchemaDefinitionProperty<number, JobCard, Document<unknown, {}, JobCard, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCard & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    startedAt?: import("mongoose").SchemaDefinitionProperty<Date, JobCard, Document<unknown, {}, JobCard, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCard & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    completedAt?: import("mongoose").SchemaDefinitionProperty<Date, JobCard, Document<unknown, {}, JobCard, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCard & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    items?: import("mongoose").SchemaDefinitionProperty<JobCardItem[], JobCard, Document<unknown, {}, JobCard, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCard & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isDeleted?: import("mongoose").SchemaDefinitionProperty<boolean, JobCard, Document<unknown, {}, JobCard, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobCard & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, JobCard>;
