import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CommentEntity } from '../comment/comment.entity';
import * as bcrypt from 'bcryptjs';
import { CardEntity } from '../card/card.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', name: 'email', nullable: false, unique: true })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar', name: 'username', nullable: false })
  username: string;

  @ApiProperty()
  @Column({ type: 'varchar', name: 'password', nullable: false, select: false })
  password: string;

  @ApiProperty()
  @Column({ default: false })
  isVerified: boolean;

  @ApiProperty()
  @OneToMany(() => CardEntity, (column) => column.user, { cascade: true })
  cards: CardEntity[];

  @ApiProperty()
  @OneToMany(() => CommentEntity, (comment) => comment.user, { cascade: true })
  comments: CommentEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  passwordBcrypt() {
    if (this.password) {
      this.password = bcrypt.hashSync(
        this.password,
        Number(process.env.PASWORD_SALT),
      );
    }
  }
}
