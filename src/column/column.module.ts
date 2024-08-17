import { Module } from '@nestjs/common';
import { ColumnController } from './column.controller';
import { ColumnService } from './column.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from './column.entity';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from 'src/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([ColumnEntity]),
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configservice: ConfigService) => ({
        global: true,
        secret: configservice.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],
  controllers: [ColumnController],
  providers: [ColumnService],
  exports: [ColumnService],
})
export class ColumnModule {}
