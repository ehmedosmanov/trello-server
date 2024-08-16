import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AuthDto } from 'src/auth/dtos/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
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
    await this.findUserById(id);
    await this.userRepository.update(id, dto);
    return await this.findUserById(id);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.findUserById(id);
    await this.userRepository.remove(user);
  }
}
