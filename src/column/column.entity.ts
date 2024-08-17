import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../common/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CardEntity } from '../card/card.entity';

@Entity('columns')
export class ColumnEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', name: 'title', nullable: false })
  title: string;

  @ApiProperty()
  @OneToMany(() => CardEntity, (card) => card.column)
  cards: CardEntity[];

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.columns, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ApiProperty()
  @Column({ type: 'integer', name: 'user_id', nullable: false })
  userId: number;
}
