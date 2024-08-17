import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from './card.entity';
import { ColumnModule } from 'src/column/column.module';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity]), ColumnModule],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService]
})
export class CardModule {}
