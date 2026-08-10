export declare class CreateBookingDto {
    customerId: string;
    vehicleId: string;
    locationId: string;
    serviceDateTime: Date;
    serviceType: string;
    serviceDetails?: string;
    status?: string;
}
export declare class UpdateBookingDto extends CreateBookingDto {
}
