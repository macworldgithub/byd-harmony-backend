export declare class CreateCustomerDto {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    address?: string;
    suburb?: string;
    state?: string;
    postcode?: string;
    dateOfBirth?: string;
    licenceNumber?: string;
    preferredLocationId?: string;
    lifecycleStage?: string;
    source?: string;
    consentSms?: boolean;
    consentEmail?: boolean;
    consentPhone?: boolean;
    notes?: string;
}
export declare class UpdateCustomerDto extends CreateCustomerDto {
    isDeleted?: boolean;
}
