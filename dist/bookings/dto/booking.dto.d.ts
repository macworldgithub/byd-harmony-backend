export declare class CreateBookingDto {
    customerId: string;
    vehicleId: string;
    locationId: string;
    scheduledAt: Date;
    estimatedDuration?: number;
    serviceType?: string;
    description?: string;
    status?: string;
    assignedTechnicianId?: number;
    customerNotes?: string;
    internalNotes?: string;
    completedAt?: Date;
}
declare const UpdateBookingDto_base: import("@nestjs/common").Type<Partial<CreateBookingDto>>;
export declare class UpdateBookingDto extends UpdateBookingDto_base {
}
export {};
