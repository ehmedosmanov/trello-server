import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AuthDto } from '../auth/dtos/auth.dto';
import { ColumnEntity } from 'src/column/column.entity';
import * as bcrypt from 'bcryptjs'
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
  ) {}

  async findAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['columns'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async createUser(dto: AuthDto): Promise<UserEntity> {
    const isUserExist = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (isUserExist)
      throw new BadRequestException('This user already exist with this email');
    const user = this.userRepository.create(dto);
    console.log('user', user);
    return await this.userRepository.save(user);
  }

  async updateUser(id: number, dto: Partial<AuthDto>): Promise<UserEntity> {
    const user = await this.findUserById(id);

    if (dto.password) {
      dto.password = bcrypt.hashSync(dto.password, Number(process.env.PASWORD_SALT));
    }
  
    Object.assign(user, dto);
    return await this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.findUserById(id);
    await this.userRepository.remove(user);
  }

  async findUserColumns(userId: number): Promise<ColumnEntity[]> {
    const user = await this.findUserById(userId);
    return user.columns;
  }

  async deleteColumnsByUser(userId: number, columnId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User not found with Id ${userId}`);
    };
  
    const column = await this.columnRepository.findOne({ where: { id: columnId, user: { id: userId } } });
    if (!column) {
      throw new NotFoundException(`Column with ID ${columnId} not found for user with ID ${userId}`);
    }

    await this.columnRepository.remove(column);
  }
}
