export declare class CreateLocationDto {
    name: string;
    type: string;
    address?: string;
    suburb?: string;
    state?: string;
    postcode?: string;
    phone?: string;
    email?: string;
    capacity?: number;
}
export declare class UpdateLocationDto {
    name?: string;
    type?: string;
    address?: string;
    suburb?: string;
    state?: string;
    postcode?: string;
    phone?: string;
    email?: string;
    capacity?: number;
    isActive?: boolean;
}
