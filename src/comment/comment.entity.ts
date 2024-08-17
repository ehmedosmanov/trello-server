import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../common/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CardEntity } from '../card/card.entity';
import { UserEntity } from '../user/user.entity';

@Entity('comments')
export class CommentEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', name: 'comment', nullable: false })
  content: string;

  @ApiProperty({ type: () => CardEntity })
  @ManyToOne(() => CardEntity, (card) => card.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'card_id' })
  card: CardEntity;

  @ApiProperty()
  @Column({ type: 'integer', nullable: false, name: 'card_id' })
  cardId: number;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ApiProperty()
  @Column({ type: 'integer', nullable: false, name: 'user_id' })
  userId: number;
}
