import { Repository } from 'typeorm';
import { ColumnEntity } from './column.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateColumnDto } from './dtos/create-column.dto';
import { UpdateColumnDto } from './dtos/update-column.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
    private readonly userService: UserService,
  ) {}

  async findAllColumns(): Promise<ColumnEntity[]> {
    return await this.columnRepository.find({
      relations: ['user', 'cards'],
    });
  }

  async createColumn(createColumnDto: CreateColumnDto): Promise<ColumnEntity> {
    const user = await this.userService.findUserById(createColumnDto.userId);
    const column = this.columnRepository.create({
      ...createColumnDto,
      user,
    });

    return await this.columnRepository.save(column);
  }

  async findColumnById(id: number): Promise<ColumnEntity> {
    const column = await this.columnRepository.findOne({ where: { id } });
    if (!column) {
      throw new NotFoundException(`Column Not found by id: ${id}`);
    }
    return column;
  }

  async updateColumn(
    id: number,
    updateColumnDto: UpdateColumnDto,
  ): Promise<ColumnEntity> {
    const column = await this.findColumnById(id);
    Object.assign(column, updateColumnDto);
    return await this.columnRepository.save(column);
  }

  async deleteColumn(id: number): Promise<void> {
    const column = await this.findColumnById(id);
    await this.columnRepository.remove(column);
  }
}
