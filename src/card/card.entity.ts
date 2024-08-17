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

@Entity('cards')
export class CardEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', name: 'title', nullable: false })
  title: string;

  @ApiProperty()
  @Column({ type: 'varchar', name: 'description', nullable: true })
  description: string;

  @ApiProperty()
  @Column({ type: 'integer', name: 'order', nullable: false, default: 0 })
  order: number;

  @ManyToOne(() => ColumnEntity, (column) => column.cards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'column_id' })
  column: ColumnEntity;

  @ApiProperty()
  @Column({ type: 'integer', name: 'column_id', nullable: false })
  columnId: number;

  @ApiProperty()
  @OneToMany(() => CommentEntity, (comment) => comment.card)
  comments: CommentEntity[];
}
