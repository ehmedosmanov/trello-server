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
import { CommentService } from './comment.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('comment')
@ApiTags('Comments')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT-auth')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all comments' })
  @ApiOkResponse({
    description: 'List of all comments',
    type: [CommentEntity],
  })
  getAllComments() {
    return this.commentService.getAllComments();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a comment by Id' })
  @ApiOkResponse({
    description: 'Comment getted successfully',
    type: CommentEntity,
  })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.findCommentById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new Comment' })
  @ApiCreatedResponse({
    description: 'Comment successfully created',
    type: CommentEntity,
  })
  @ApiBody({ type: CreateCommentDto })
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a comment by Id' })
  @ApiOkResponse({
    description: 'Comment updated successfully',
    type: CommentEntity,
  })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  @ApiBody({ type: UpdateCommentDto })
  updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(id, updateCommentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a comment by Id' })
  @ApiOkResponse({ description: 'Comment deleted successfully' })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  deleteComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.deleteComment(id);
  }
}
