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
import { ColumnEntity } from '../column/column.entity';
import { CommentEntity } from '../comment/comment.entity';
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class UserEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', name: 'email', nullable: false, unique: true })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar', name: 'password', nullable: false, select: false })
  password: string;

  @ApiProperty()
  @OneToMany(() => ColumnEntity, (column) => column.user)
  columns: ColumnEntity[];

  @ApiProperty()
  @OneToMany(() => CommentEntity, (comment) => comment.user)
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
