export declare class CreateVehicleDto {
    customerId: string;
    vin?: string;
    rego?: string;
    make?: string;
    model: string;
    year?: number;
    colour?: string;
    odometer?: number;
    status?: string;
    deliveredAt?: Date;
    nextServiceDue?: Date;
    warrantyExpiry?: Date;
}
export declare class UpdateVehicleDto extends CreateVehicleDto {
}
