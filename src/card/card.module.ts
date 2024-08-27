import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from './card.entity';
import { ColumnModule } from '../column/column.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CardEntity]),
    ColumnModule,
    AuthModule
  ],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
