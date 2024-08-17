import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'new comment' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  cardId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
