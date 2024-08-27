import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AuthDto } from '../auth/dtos/auth.dto';
import { v4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { EmailVerifyToken } from '../auth/entities/email-verify-token.entity';
import { MailService } from '../mail/mail.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(EmailVerifyToken)
    private readonly emailVerificationTokenRepository: Repository<EmailVerifyToken>,
    private readonly mailService: MailService,
  ) {}

  async findAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async createUser(dto: AuthDto): Promise<{ message: string }> {
    const isUserExist = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (isUserExist)
      throw new BadRequestException('This user already exist with this email');
    const user = this.userRepository.create({
      ...dto,
      isVerified: false
    });
    await this.userRepository.save(user);

    const verifyMailToken = await this.createEmailVerifyToken(user);

    await this.mailService.sendVerifyMail(
      user.username,
      verifyMailToken.token,
      user.email,
    );

    return {
      message:
        'Registration successful, please check your email to verify your account.',
    };
  }

  async updateUser(id: number, dto: Partial<AuthDto>): Promise<UserEntity> {
    const user = await this.findUserById(id);

    if (dto.password) {
      dto.password = bcrypt.hashSync(
        dto.password,
        Number(process.env.PASWORD_SALT),
      );
    }

    Object.assign(user, dto);
    return await this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.findUserById(id);
    await this.userRepository.remove(user);
  }

  // async findUserColumns(userId: number): Promise<ColumnEntity[]> {
  //   const user = await this.findUserById(userId);
  //   return user.columns;
  // }

  // async deleteColumnsByUser(userId: number, columnId: number): Promise<void> {
  //   const user = await this.userRepository.findOne({ where: { id: userId } });
  //   if (!user) {
  //     throw new NotFoundException(`User not found with Id ${userId}`);
  //   };

  //   const column = await this.columnRepository.findOne({ where: { id: columnId, user: { id: userId } } });
  //   if (!column) {
  //     throw new NotFoundException(`Column with ID ${columnId} not found for user with ID ${userId}`);
  //   }

  //   await this.columnRepository.remove(column);
  // }

  private async createEmailVerifyToken(user: UserEntity) {
    const createEmailToken = this.emailVerificationTokenRepository.create({
      user: user,
      token: v4() as string,
    });

    if (!createEmailToken) throw new BadRequestException('Coudnt create token');
    const saveToken =
      await this.emailVerificationTokenRepository.save(createEmailToken);
    return saveToken;
  }
}
