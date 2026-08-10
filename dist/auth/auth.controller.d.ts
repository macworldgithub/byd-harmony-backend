import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    refresh(refreshDto: RefreshDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    logout(user: any): Promise<{
        success: boolean;
    }>;
    getProfile(user: any): any;
}
