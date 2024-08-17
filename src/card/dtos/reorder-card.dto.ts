import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ReorderCardDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  order: number;
}

export class ReorderCardsDto {
  @ApiProperty({ type: [ReorderCardDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReorderCardDto)
  cards: ReorderCardDto[];
}
