import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class MoveCardDto {
  @ApiProperty({ example: 2 })
  @IsInt()
  @IsNotEmpty()
  newColumnId: number;
}
