import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { CardModule } from '../card/card.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    CardModule,
    UserModule,
    AuthModule
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
