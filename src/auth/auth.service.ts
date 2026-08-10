import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto, RefreshDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = registerDto.password ? await bcrypt.hash(registerDto.password, 10) : undefined;
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    return this.generateTokens(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is disabled');
    }

    return this.generateTokens(user);
  }

  async refresh(refreshDto: RefreshDto) {
    try {
      const payload = this.jwtService.verify(refreshDto.refreshToken, { secret: process.env.JWT_REFRESH_SECRET || 'your_refresh_secret_here' });
      const user = await this.usersService.findById(payload.sub);
      
      if (!user || !user.refreshToken) {
        throw new UnauthorizedException();
      }

      const isRefreshTokenValid = await bcrypt.compare(refreshDto.refreshToken, user.refreshToken);
      if (!isRefreshTokenValid) {
        throw new UnauthorizedException();
      }

      return this.generateTokens(user);
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    await this.usersService.update(userId, { refreshToken: null });
    return { success: true };
  }

  private async generateTokens(user: any) {
    const payload = { email: user.email, sub: user._id, role: user.role };
    
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { 
      secret: process.env.JWT_REFRESH_SECRET || 'your_refresh_secret_here',
      expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as any,
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.update(user._id, { 
      refreshToken: hashedRefreshToken,
      lastSignedIn: new Date()
    });

    const userObj = user.toObject ? user.toObject() : user;
    delete userObj.password;
    delete userObj.refreshToken;

    return {
      accessToken,
      refreshToken,
      user: userObj,
    };
  }
}
