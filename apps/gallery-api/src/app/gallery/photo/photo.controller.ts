import { Controller, Body, Post, Query, Get, UseGuards } from '@nestjs/common';
import { QueryPhotoDto, CreatePhotoDto } from './photo.dto';
import { PhotoService } from './photo.service';
import { PhotoEntity } from './photo.entity';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { DeletBatcheDto } from '@eapp/server/core/base';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard, RoleGuard } from '@eapp/server/core/guards';
import { PaginationResult } from '@eapp/types';

@Controller()
@ApiTags('photo')
@ApiBearerAuth()
export class PhotoController {
  constructor(private service: PhotoService) {}
  /**
   * 通过id查询
   * @param id
   */
  @ApiOperation({ summary: '通过id查询' })
  @Get('queryById')
  queryById(@Query('id') id: number): Promise<PhotoEntity> {
    return this.service.get({ id });
  }
  /**
   * 分页查询
   * @param params
   */
  @ApiOperation({ summary: '分页查询' })
  @Get('queryPage')
  queryPage(
    @Query() params: QueryPhotoDto
  ): Promise<PaginationResult<PhotoEntity>> {
    return this.service.getPage(params);
  }
  /**
   * 新增
   * @param user
   */
  @ApiOperation({ summary: '新增' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create')
  create(@Body() params: CreatePhotoDto): Promise<PhotoEntity> {
    const photo = new PhotoEntity();
    Object.assign(photo, { ...params });
    return this.service.create(photo);
  }

  /**
   * 删除
   * @param params
   */
  @ApiOperation({ summary: '删除' })
  @Post('deleteBatch')
  @UseGuards(JwtAuthGuard, RoleGuard)
  deleteBatch(@Body() params: DeletBatcheDto): Promise<DeleteResult> {
    return this.service.deleteBatch(params);
  }
}
