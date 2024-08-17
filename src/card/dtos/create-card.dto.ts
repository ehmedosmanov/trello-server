import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({ example: 'new card' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'This is a description of the card',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  columnId: number;
}
