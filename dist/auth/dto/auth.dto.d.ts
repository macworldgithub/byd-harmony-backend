export declare class RegisterDto {
    name: string;
    email: string;
    password?: string;
    phone?: string;
    role?: string;
    staffRole?: string;
    locationId?: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class RefreshDto {
    refreshToken: string;
}
