import { Controller, Body, Post, Query, Get, UseGuards } from '@nestjs/common';
import { QueryAlbumDto, CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { DeletBatcheDto } from '@eapp/server/core/base';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard, RoleGuard } from '@eapp/server/core/guards';
import { PaginationResult } from '@eapp/types';

@Controller()
@ApiTags('album')
@ApiBearerAuth()
export class AlbumController {
  constructor(private service: AlbumService) {}
  /**
   * 通过id查询
   * @param id
   */
  @ApiOperation({ summary: '通过id查询' })
  @Get('queryById')
  queryById(@Query('id') id: number): Promise<AlbumEntity> {
    return this.service.get({ id });
  }
  /**
   * 分页查询
   * @param params
   */
  @ApiOperation({ summary: '分页查询' })
  @Get('queryPage')
  queryPage(
    @Query() params: QueryAlbumDto
  ): Promise<PaginationResult<AlbumEntity>> {
    return this.service.getPage(params);
  }
  /**
   * 新增
   * @param user
   */
  @ApiOperation({ summary: '新增' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create')
  create(@Body() params: CreateAlbumDto): Promise<AlbumEntity> {
    return this.service.createAlbum(params);
  }

  /**
   * 修改
   * @param user
   */
  @ApiOperation({ summary: '修改' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('update')
  update(@Body() params: UpdateAlbumDto) {
    return this.service.updateAlbum(params);
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
