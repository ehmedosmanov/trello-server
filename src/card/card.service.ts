import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CardEntity } from './card.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCardDto } from './dtos/create-card.dto';
import { UpdateCardDto } from './dtos/update-card.dto';
import { ColumnEntity } from 'src/column/column.entity';
import { ColumnService } from 'src/column/column.service';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
    private readonly columnService: ColumnService,
  ) {}

    async createCard(createCardDto: CreateCardDto): Promise<CardEntity> {
      const column = await this.columnService.findColumnById(
        createCardDto.columnId,
      );

      const createCard = this.cardRepository.create({
        ...createCardDto,
        column,
      });
      return await this.cardRepository.save(createCard);
    }

  async getAllCards(): Promise<CardEntity[]> {
    const findAllCards = await this.cardRepository.find({
      relations: ['comments', 'column'],
    });
    return findAllCards;
  }

  async findCardById(id: number): Promise<CardEntity> {
    const findCard = await this.cardRepository.findOne({
      where: { id },
      relations: ['comments', 'column'],
    });
    if (!findCard) {
      throw new NotFoundException(`Card Not found by id: ${id}`);
    }
    return findCard;
  }

  async updateCard(
    id: number,
    updateCardDto: UpdateCardDto,
  ): Promise<CardEntity> {
    const findCard = await this.findCardById(id);
    Object.assign(findCard, updateCardDto);
    return await this.cardRepository.save(findCard);
  }

  async deleteColumn(id: number): Promise<void> {
    const column = await this.findCardById(id);
    await this.cardRepository.remove(column);
  }
}
