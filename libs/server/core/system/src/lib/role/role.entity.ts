import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '@eapp/server/core/base';
import { UserEntity } from '..//user';
import { MenuEntity } from '../menu';

@Entity('role')
export class RoleEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 30 })
  code: string;

  @ManyToMany(() => UserEntity)
  users: UserEntity[];

  @ManyToMany(() => MenuEntity, (menu) => menu.roles, {
    cascade: true,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinTable()
  menus: MenuEntity[];
}
