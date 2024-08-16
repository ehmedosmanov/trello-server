import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardModule } from './card/card.module';
import { CommentModule } from './comment/comment.module';
import { ColumnModule } from './column/column.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        logging: true,
        synchronize: false,
        migrations: [],
        entities: [path.join(__dirname, '/**/*.entity.{ts,js}')],
      }),
    }),
    UserModule,
    AuthModule,
    CardModule,
    CommentModule,
    ColumnModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
