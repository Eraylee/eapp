import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '@eapp/server/core/base';
import { RoleEntity } from '../role';
@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30, unique: true, comment: '用户名' })
  username: string;

  @Column({ type: 'varchar', length: 30, comment: '昵称' })
  nickname: string;

  @Column({ type: 'varchar', length: 30, unique: true, comment: '用户编号' })
  userNo: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: true,
    comment: '邮箱',
  })
  email: string;

  @Column({ type: 'char', length: 64, select: false, comment: '密码' })
  password: string;

  @Column({ type: 'varchar', length: 30, comment: '手机号' })
  phone: string;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: '头像' })
  avatar: string;

  @ManyToMany(() => RoleEntity, {
    cascade: true,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinTable()
  roles: RoleEntity[];
}
