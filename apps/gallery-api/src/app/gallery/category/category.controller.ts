import { Get, Post, Body, Query, Controller, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PaginationResult } from '@eapp/types';
import { JwtAuthGuard, RoleGuard } from '@eapp/server/core/guards';
import { CategoryService } from './category.service';
import {
  UpdateCategoryDto,
  CreateCategoryDto,
  QueryCategoryDto,
} from './category.dto';
import { DeletBatcheDto } from '@eapp/server/core/base';
import { CategoryEntity } from './category.entity';
import { DeleteResult } from 'typeorm';

@ApiBearerAuth()
@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}
  /**
   * 通过id查询
   * @param id
   */
  @ApiOperation({ summary: '通过id查询' })
  @Get('queryById')
  queryById(@Query('id') id: number): Promise<CategoryEntity> {
    return this.service.get({ id });
  }
  /**
   * 分页查询
   * @param params
   */
  @ApiOperation({ summary: '分页查询' })
  @Get('queryPage')
  queryPage(
    @Query() params: QueryCategoryDto
  ): Promise<PaginationResult<CategoryEntity>> {
    return this.service.getPage(params);
  }

  /**
   * 新增
   * @param user
   */
  @ApiOperation({ summary: '新增' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create')
  create(@Body() params: UpdateCategoryDto): Promise<CategoryEntity> {
    const category = new CategoryEntity();
    Object.assign(category, params);
    return this.service.create(category);
  }
  /**
   * 新增
   * @param category
   */
  @ApiOperation({ summary: '修改' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('update')
  update(@Body() params: CreateCategoryDto) {
    const category = new CategoryEntity();
    Object.assign(category, params);
    return this.service.update(category);
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
