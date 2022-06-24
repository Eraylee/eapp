import {
  Column,
  Entity,
  ManyToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { BaseEntity } from '@eapp/server/core/base';
import { Status } from '@eapp/types';
import { RoleEntity } from '../role';

export enum MenuTypes {
  Layout = 1,
  Api,
  Route,
}

@Entity('menu')
@Tree('materialized-path')
export class MenuEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  action: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  icon: string;

  @Column({ type: 'smallint', default: MenuTypes.Layout })
  type: MenuTypes;

  @Column({ type: 'varchar', length: 100, nullable: true })
  path: string;

  @Column({ type: 'smallint', default: Status.Enabled })
  visiable: Status;

  @ManyToMany(() => RoleEntity, (role) => role.menus)
  roles: RoleEntity[];

  @TreeChildren({
    cascade: true,
  })
  children: MenuEntity[];

  @TreeParent()
  parent: MenuEntity;
}
