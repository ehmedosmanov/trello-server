import { BaseEntity } from '../../common/base.entity';
import { UserEntity } from '../../user/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('EmailVerifyTokens')
export class EmailVerifyToken extends BaseEntity {
  @Column({
    type: 'varchar',
    unique: true,
  })
  token: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
