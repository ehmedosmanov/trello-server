import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../common/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CardEntity } from '../card/card.entity';
import { BoardEntity } from '../boards/board.entity';

@Entity('columns')
export class ColumnEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', name: 'title', nullable: false })
  title: string;

  @ApiProperty()
  @Column({
    type: 'integer',
    name: 'order',
    nullable: false,
    default: 0,
  })
  order: number;

  @ApiProperty()
  @OneToMany(() => CardEntity, (card) => card.column, {
    cascade: true,
  })
  cards: CardEntity[];

  @ApiProperty({ type: () => BoardEntity })
  @ManyToOne(() => BoardEntity, (board) => board.columns, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workspace_id' })
  board: BoardEntity;

  @ApiProperty()
  @Column({ type: 'integer', nullable: false, name: 'workspace_id' })
  public boardId: number;
}
