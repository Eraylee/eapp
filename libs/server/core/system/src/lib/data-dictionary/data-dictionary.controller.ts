import { Controller, Get, Query, Body, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DataDictionaryEntity } from './data-dictionary.entity';
import { DataDictionaryService } from './data-dictionary.service';
import {
  QueryDataDictionaryDto,
  CreateDataDictionaryDto,
  UpdateDataDictionaryDto,
} from './data-dictionary.dto';
import { PaginationResult } from '@eapp/types';
import { DeletBatcheDto } from '@eapp/server/core/base';
import { DeleteResult } from 'typeorm';
import { RoleGuard } from '@eapp/server/core/guards';
import { JwtAuthGuard } from '@eapp/server/core/guards';

@Controller()
@ApiTags('dataDictionary')
@ApiBearerAuth()
export class DataDictionaryController {
  constructor(private service: DataDictionaryService) {}
  /**
   * 通过id查询
   * @param id
   */
  @ApiOperation({ summary: '通过id查询' })
  @Get('queryById')
  queryById(@Query('id') id: number): Promise<DataDictionaryEntity> {
    return this.service.getById(id);
  }
  /**
   * 分页查询
   * @param params
   */
  @ApiOperation({ summary: '分页查询' })
  @Get('queryPage')
  queryPage(
    @Query() params: QueryDataDictionaryDto
  ): Promise<PaginationResult<DataDictionaryEntity>> {
    return this.service.getPage(params);
  }
  /**
   * 新增
   * @param user
   */
  @ApiOperation({ summary: '新增' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create')
  create(
    @Body() params: CreateDataDictionaryDto
  ): Promise<DataDictionaryEntity> {
    return this.service.createDataDictionary(params);
  }
  /**
   * 修改
   * @param user
   */
  @ApiOperation({ summary: '修改' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('update')
  update(
    @Body() params: UpdateDataDictionaryDto
  ): Promise<DataDictionaryEntity> {
    return this.service.updateDataDictionary(params);
  }
  /**
   * 批量删除
   * @param params
   */
  @ApiOperation({ summary: '批量删除' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('deleteBatch')
  deleteBatch(@Body() params: DeletBatcheDto): Promise<DeleteResult> {
    return this.service.deleteBatch(params);
  }
  /**
   * 获取全部菜单树
   */
  @ApiOperation({ summary: '获取全部字典树' })
  @Get('getAllTree')
  getAllTree(): Promise<DataDictionaryEntity[]> {
    return this.service.getDataDictionaryTree();
  }
}
