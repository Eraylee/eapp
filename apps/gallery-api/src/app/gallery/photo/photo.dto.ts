import { IsNotEmpty, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PhotoEntity } from './photo.entity';
import { PaginationDto } from '@eapp/server/core/base';
// 分页查询
export class QueryPhotoDto extends PaginationDto {
  @ApiProperty({
    description: '关键词',
    required: false,
  })
  keyword: string;
}
//新增
export class CreatePhotoDto implements Partial<PhotoEntity> {
  @ApiProperty({
    description: '图片地址',
  })
  @IsNotEmpty()
  @IsDefined()
  image: string;

  @ApiProperty({
    description: '相机',
  })
  make: string;

  @ApiProperty({
    description: '型号',
    required: false,
  })
  model: string;

  @ApiProperty({
    description: '软件',
  })
  software: string;

  @ApiProperty({
    description: '曝光时间',
  })
  exposureTime: string;

  @ApiProperty({
    description: '光圈',
  })
  fNumber: number;

  @ApiProperty({
    description: '曝光方式',
  })
  exposureProgram: number;

  @ApiProperty({
    description: 'ISO',
  })
  iso: number;

  @ApiProperty({
    description: 'exif版本',
  })
  exifVersion: string;

  @ApiProperty({
    description: '原始图像采集的时间',
  })
  dateTimeOriginal: Date;

  @ApiProperty({
    description: '快门速度',
  })
  shutterSpeedValue: string;

  @ApiProperty({
    description: '光圈',
  })
  apertureValue: number;

  @ApiProperty({
    description: '曝光补偿',
  })
  exposureCompensation: string;

  @ApiProperty({
    description: '最大光圈',
  })
  maxApertureValue: number;

  @ApiProperty({
    description: '测光方式',
  })
  meteringMode: number;

  @ApiProperty({
    description: '闪光',
  })
  flash: number;

  @ApiProperty({
    description: '图宽',
  })
  focalLength: number;

  @ApiProperty({
    description: '图高',
  })
  exifImageHeight: number;

  @ApiProperty({
    description: '镜头型号',
  })
  lensModel: string;
}
