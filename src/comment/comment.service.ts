import { UserService } from 'src/user/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { CardService } from 'src/card/card.service';
import { UpdateCommentDto } from './dtos/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly userService: UserService,
    private readonly cardService: CardService,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
  ): Promise<CommentEntity> {
    const user = await this.userService.findUserById(createCommentDto.userId);
    const card = await this.cardService.findCardById(createCommentDto.cardId);

    const createComment = this.commentRepository.create({
      ...createCommentDto,
      user,
      card,
    });

    return await this.commentRepository.save(createComment);
  }

  async getAllComments(): Promise<CommentEntity[]> {
    const findAllCards = await this.commentRepository.find({
      relations: ['user', 'card'],
    });
    return findAllCards;
  }

  async findCommentById(id: number): Promise<CommentEntity> {
    const findCommend = await this.commentRepository.findOne({
      where: { id },
      relations: ['user', 'card'],
    });
    if (!findCommend) {
      throw new NotFoundException(`Comment Not found by id: ${id}`);
    }
    return findCommend;
  }

  async updateComment(
    id: number,
    updateCommentDto: Partial<UpdateCommentDto>,
  ): Promise<CommentEntity> {
    const findComment = await this.findCommentById(id);

    Object.assign(findComment, updateCommentDto);

    return await this.commentRepository.save(findComment);
  }

  async deleteComment(id: number): Promise<void> {
    const findComment = await this.findCommentById(id);

    await this.commentRepository.remove(findComment);
  }
}
