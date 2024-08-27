import { BoardEntity } from './../boards/board.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('workspaces')
export class WorkSpacesEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', nullable: false, name: 'title', unique: true })
  name: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'description',
    length: 255,
  })
  description: string;

  @ApiProperty()
  @OneToMany(() => BoardEntity, (board) => board.workspace, { cascade: true })
  boards: BoardEntity[];
}
