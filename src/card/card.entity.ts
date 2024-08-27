import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../common/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ColumnEntity } from '../column/column.entity';
import { CommentEntity } from '../comment/comment.entity';
import { UserEntity } from '../user/user.entity';

@Entity('cards')
export class CardEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', name: 'title', nullable: false })
  title: string;

  @ApiProperty()
  @Column({ type: 'varchar', name: 'description', nullable: true })
  description: string;

  @ApiProperty()
  @Column({
    type: 'integer',
    name: 'order',
    nullable: false,
    default: 0,
  })
  order: number;

  @ApiProperty({ type: () => ColumnEntity })
  @ManyToOne(() => ColumnEntity, (column) => column.cards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'column_id' })
  column: ColumnEntity;

  @ApiProperty()
  @Column({ type: 'integer', name: 'column_id', nullable: false })
  columnId: number;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.cards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ApiProperty()
  @Column({ type: 'integer', name: 'user_id', nullable: false })
  userId: number;

  @ApiProperty()
  @OneToMany(() => CommentEntity, (comment) => comment.card, { cascade: true })
  comments: CommentEntity[];
}
