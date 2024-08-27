import { UserService } from './../user/user.service';
import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dtos/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { EmailVerifyToken } from './entities/email-verify-token.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(EmailVerifyToken)
    private readonly emailVeifyRepository: Repository<EmailVerifyToken>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signUp(body: AuthDto): Promise<{ message: string }> {
    return await this.userService.createUser(body);
  }

  async login(body: AuthDto): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({
      where: { email: body.email },
      select: ['id', 'email', 'password'],
    });

    if (!user || !(await this.validatePassword(body.password, user.password))) {
      throw new BadRequestException('Invalid credentials provided');
    }

    if (!user.isVerified) {
      throw new UnauthorizedException(
        'Email not verified. Please verify your email before logging in.',
      );
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async verifyEmail(
    token: string,
  ): Promise<{ message: string; access_token: string }> {
    const verifyUserToken = await this.emailVeifyRepository.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!verifyUserToken) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    const user = verifyUserToken.user;

    if (user.isVerified) {
      throw new BadRequestException('Email is already verified.');
    }

    user.isVerified = true;
    await this.userRepository.save(user);

    await this.emailVeifyRepository.delete(verifyUserToken.id);

    const payload = { sub: user.id, email: user.email };

    return {
      message: 'Your email has been successfully verified. You can now log in.',
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private async validatePassword(
    inputPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, storedPassword);
  }
}
