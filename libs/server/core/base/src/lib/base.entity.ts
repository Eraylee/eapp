import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';
import { Status } from '@eapp/types';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'smallint',
    default: 0,
    comment: '排序',
  })
  sort: number;

  @Column({
    type: 'smallint',
    default: Status.Enabled,
    comment: '启用状态',
  })
  status: Status;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '描述',
  })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
