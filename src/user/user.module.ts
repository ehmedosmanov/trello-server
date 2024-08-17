import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { ColumnEntity } from 'src/column/column.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ColumnEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configservice: ConfigService) => ({
        global: true,
        secret: configservice.get<string>("JWT_SECRET_KEY"),
        signOptions: { expiresIn: '15m' },
      })
    })
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
