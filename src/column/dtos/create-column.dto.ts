import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty({ example: 'To Do' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
