import { UserService } from './../user/user.service';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dtos/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signUp(body: AuthDto): Promise<UserEntity> {
    const result = await this.userService.createUser(body);
    return result;
  }

  async login(body: AuthDto): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({
      where: { email: body.email },
      select: ['id', 'email', 'password'],
    });

    if (!user || !(await this.validatePassword(body.password, user.password))) {
      throw new BadRequestException('Invalid credentials provided');
    }

    const payload = { sub: user.id, email: user.email };
    return {
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
