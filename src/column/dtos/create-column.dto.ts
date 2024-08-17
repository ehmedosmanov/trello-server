import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty({ example: 'To Do' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
