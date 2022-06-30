import { Entity, Column, OneToMany } from 'typeorm';
import { AlbumEntity } from '../album/album.entity';
import { BaseEntity } from '@eapp/server/core/base';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @Column({
    length: 32,
  })
  name: string;

  @OneToMany((type) => AlbumEntity, (album) => album.category)
  albums: AlbumEntity[];
}
