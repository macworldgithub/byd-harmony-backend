export declare class CreateJobCardDto {
    customerId: string;
    vehicleId: string;
    locationId: string;
    bookingId?: string;
    technicianId?: string;
    priority?: string;
    serviceType: string;
    workRequired: string;
    odometerIn?: number;
    estimatedCost?: number;
}
export declare class UpdateJobCardDto {
    technicianId?: string;
    diagnosis?: string;
    odometerOut?: number;
    actualCost?: number;
    status?: string;
    priority?: string;
}
export declare class JobCardItemDto {
    type: string;
    description: string;
    quantity?: number;
    unitCost: number;
    partNumber?: string;
    technicianId?: string;
}
