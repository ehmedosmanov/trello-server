import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CardEntity } from './card.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
  ) {}
}
