import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@eapp/server/core/base';
import { CategoryEntity } from '../category';
import { PhotoEntity } from '../photo';

@Entity('album')
export class AlbumEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100, comment: '标题' })
  title: string;

  @ManyToOne((type) => CategoryEntity, (category) => category.albums, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: true,
  })
  category: CategoryEntity;

  @OneToMany((type) => PhotoEntity, (photo) => photo.album)
  photos: PhotoEntity[];
}
