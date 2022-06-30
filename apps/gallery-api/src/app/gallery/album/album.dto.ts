import { IsNotEmpty, IsDefined, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AlbumEntity } from './album.entity';
import { PaginationDto, UpdateDto } from '@eapp/server/core/base';
// 分页查询
export class QueryAlbumDto extends PaginationDto {
  @ApiProperty({
    description: '标题',
  })
  title: string;

  @ApiProperty({
    description: '标题',
  })
  categoryId: number;
}
//新增
export class CreateAlbumDto implements Partial<AlbumEntity> {
  @ApiProperty({
    description: '标题',
  })
  @IsNotEmpty()
  @IsDefined()
  title: string;

  @ApiProperty({
    description: '标题',
  })
  @IsNotEmpty()
  @IsDefined()
  categoryId: number;

  @ApiProperty({
    description: '图片ids',
  })
  @IsNotEmpty()
  @IsDefined()
  @IsArray()
  photoIds: number[];
}
//修改
export class UpdateAlbumDto extends UpdateDto implements Partial<AlbumEntity> {
  @ApiProperty({
    description: '标题',
  })
  @IsNotEmpty()
  @IsDefined()
  title: string;

  @ApiProperty({
    description: '标题',
  })
  @IsNotEmpty()
  @IsDefined()
  categoryId: number;

  @ApiProperty({
    description: '图片ids',
  })
  @IsArray()
  photoIds: number[];
}
