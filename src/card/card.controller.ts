import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CardService } from './card.service';
import { AuthGuard } from '../guards/auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CardEntity } from './card.entity';
import { CreateCardDto } from './dtos/create-card.dto';
import { UpdateCardDto } from './dtos/update-card.dto';
import { MoveCardDto } from './dtos/move-card.dto';
import { ReorderCardsDto } from './dtos/reorder-card.dto';

@Controller('cards')
@ApiTags('Cards')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT-auth')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all cards' })
  @ApiOkResponse({
    description: 'List of all cards',
    type: [CardEntity],
  })
  findAll() {
    return this.cardService.getAllCards();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a card by Id' })
  @ApiOkResponse({
    description: 'Card getted successfully',
    type: CardEntity,
  })
  @ApiNotFoundResponse({ description: 'Card not found' })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.cardService.findCardById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new card' })
  @ApiCreatedResponse({
    description: 'Card successfully created',
    type: CardEntity,
  })
  @ApiBody({ type: CreateCardDto })
  create(@Body() createColumnDto: CreateCardDto) {
    return this.cardService.createCard(createColumnDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a card by Id' })
  @ApiOkResponse({
    description: 'Card updated successfully',
    type: CardEntity,
  })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @ApiBody({ type: UpdateCardDto })
  updateCard(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardService.updateCard(id, updateCardDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a card by Id' })
  @ApiOkResponse({ description: 'Card deleted successfully' })
  @ApiNotFoundResponse({ description: 'Card not found' })
  deleteCard(@Param('id', ParseIntPipe) id: number) {
    return this.cardService.deleteColumn(id);
  }

  @Put(':id/move')
  @ApiOperation({ summary: 'Move a card to a different column' })
  @ApiOkResponse({
    description: 'Card moved successfully',
    type: CardEntity,
  })
  @ApiBadRequestResponse({ description: 'Invalid data or card not found' })
  moveCard(
    @Param('id', ParseIntPipe) cardId: number,
    @Body() moveCardDto: MoveCardDto,
  ) {
    return this.cardService.moveCard(cardId, moveCardDto);
  }

  @Get('/column/:columnId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a card by column id' })
  @ApiOkResponse({
    description: 'Card getted successfully',
    type: CardEntity,
  })
  @ApiNotFoundResponse({ description: 'Card not found' })
  findCardsByColumnId(@Param('columnId', ParseIntPipe) id: number) {
    return this.cardService.findCardsByColumnId(id);
  }

  @Put(':columnId/reorder')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reorder cards in a column' })
  reorderCards(
    @Param('columnId', ParseIntPipe) columnId: number,
    @Body() reorderCardsDto: ReorderCardsDto,
  ) {
    return this.cardService.reorderCards(columnId, reorderCardsDto);
  }
}
