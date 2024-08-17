import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateColumnDto } from './dtos/create-column.dto';
import { ColumnEntity } from './column.entity';
import { UpdateColumnDto } from './dtos/update-column.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('columns')
@ApiTags('Columns')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT-auth')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Get()
  @ApiOperation({ summary: 'Get all columns' })
  @ApiOkResponse({
    description: 'List of all columns',
    type: [ColumnEntity],
  })
  findAll() {
    return this.columnService.findAllColumns();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new column' })
  @ApiCreatedResponse({
    description: 'Column successfully created',
    type: ColumnEntity,
  })
  @ApiBody({ type: CreateColumnDto })
  create(@Body() createColumnDto: CreateColumnDto) {
    return this.columnService.createColumn(createColumnDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a column by Id' })
  @ApiOkResponse({
    description: 'Column retrieved successfully',
    type: ColumnEntity,
  })
  @ApiNotFoundResponse({ description: 'Column not found' })
  findOne(@Param('id') id: number) {
    return this.columnService.findColumnById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a column by Id' })
  @ApiOkResponse({
    description: 'Column updated successfully',
    type: ColumnEntity,
  })
  @ApiNotFoundResponse({ description: 'Column not found' })
  update(@Param('id') id: number, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnService.updateColumn(id, updateColumnDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a column by ID' })
  @ApiOkResponse({ description: 'Column deleted successfully' })
  @ApiNotFoundResponse({ description: 'Column not found' })
  delete(@Param('id') id: number) {
    return this.columnService.deleteColumn(id);
  }
}
