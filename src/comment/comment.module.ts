import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { CardModule } from 'src/card/card.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    CardModule,
    UserModule
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
