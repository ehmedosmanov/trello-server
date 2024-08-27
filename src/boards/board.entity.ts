import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { WorkSpacesEntity } from '../workspaces/workspaces.entity';
import { ColumnEntity } from '../column/column.entity';

@Entity('boards')
export class BoardEntity extends BaseEntity {
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
  @Column({ type: 'varchar', name: 'bgColor', nullable: true })
  bgColor: string;

  @ApiProperty()
  @Column({ type: 'varchar', name: 'backgroundImage', nullable: true })
  backgroundImage: string;

  @ApiProperty({ type: () => WorkSpacesEntity })
  @ManyToOne(() => WorkSpacesEntity, (workspace) => workspace.boards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workspace_id' })
  workspace: WorkSpacesEntity;

  @ApiProperty()
  @Column({ type: 'integer', nullable: false, name: 'workspace_id' })
  public workspaceId: number;

  @ApiProperty()
  @OneToMany(() => ColumnEntity, (col) => col.board, {
    cascade: true,
  })
  columns: ColumnEntity[];
}
