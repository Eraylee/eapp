import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '@eapp/server/core/base';
import { AlbumEntity } from '../album';

@Entity('photo')
export class PhotoEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100, comment: '图片地址' })
  image: string;

  @Column({ type: 'varchar', length: 100, comment: '相机' })
  make: string;

  @Column({ type: 'varchar', length: 100, unique: true, comment: '型号' })
  model: string;

  @Column({ type: 'varchar', length: 100, comment: '软件' })
  software: string;

  @Column({ type: 'varchar', length: 100, comment: '曝光时间' })
  exposureTime: string;

  @Column({ type: 'float', comment: '光圈' })
  fNumber: number;
  // 1’ means manual control, ‘2’ program normal, ‘3’ aperture priority, ‘4’ shutter priority, ‘5’ program creative (slow program), ‘6’ program action(high-speed program), ‘7’ portrait mode, ‘8’ landscape mode.
  @Column({ type: 'tinyint', comment: '曝光方式' })
  exposureProgram: number;

  @Column({ type: 'int', comment: 'ISO' })
  iso: number;

  @Column({ type: 'varchar', comment: 'exif版本' })
  exifVersion: string;

  @Column({ type: 'datetime', comment: '原始图像采集的时间' })
  dateTimeOriginal: Date;

  @Column({ type: 'varchar', length: 100, comment: '快门速度' })
  shutterSpeedValue: string;

  @Column({ type: 'float', comment: '光圈' })
  apertureValue: number;

  @Column({ type: 'varchar', length: 100, comment: '曝光补偿' })
  exposureCompensation: string;

  @Column({ type: 'float', comment: '最大光圈' })
  maxApertureValue: number;
  // 测光方式。0、未知；1、平均测光；2、中心重点平均；3、单点测光；4、多点测光；5、矩阵测光；6、局部测光；255、其他
  @Column({ type: 'tinyint', comment: '测光方式' })
  meteringMode: number;
  // 0、没有使用闪光灯；1、使用闪光灯；5、闪光但没有检测到；闪光且检测到。
  @Column({ type: 'tinyint', comment: '闪光' })
  flash: number;

  @Column({ type: 'int', comment: '图宽' })
  focalLength: number;

  @Column({ type: 'int', comment: '图高' })
  exifImageHeight: number;

  @Column({ type: 'varchar', length: 100, comment: '镜头型号' })
  lensModel: string;

  @ManyToOne((type) => AlbumEntity, (album) => album.photos, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: true,
  })
  album: AlbumEntity;
}
