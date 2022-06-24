import { MenuService } from './menu.service';
import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { MenuEntity } from './menu.entity';
import { PaginationResult } from '@eapp/types';
import { DeletBatcheDto } from '@eapp/server/core/base';
import { DeleteResult } from 'typeorm';
import { QueryMenuDto, CreateMenuDto, UpdateMenuDto } from './menu.dto';
import { JwtAuthGuard, RoleGuard } from '@eapp/server/core/guards';

@Controller()
@ApiTags('menu')
@ApiBearerAuth()
export class MenuController {
  constructor(private service: MenuService) {}
  /**
   * 通过id查询
   * @param id
   */
  @ApiOperation({ summary: '通过id查询' })
  @Get('queryById')
  queryById(@Query('id') id: number): Promise<MenuEntity> {
    return this.service.getById(id);
  }
  /**
   * 分页查询
   * @param params
   */
  @ApiOperation({ summary: '分页查询' })
  @Get('queryPage')
  queryPage(
    @Query() params: QueryMenuDto
  ): Promise<PaginationResult<MenuEntity>> {
    return this.service.getPage(params);
  }
  /**
   * 新增
   * @param params
   */
  @ApiOperation({ summary: '新增' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create')
  create(@Body() params: CreateMenuDto): Promise<MenuEntity> {
    return this.service.createMenu(params);
  }
  /**
   * 修改
   * @param params
   */
  @ApiOperation({ summary: '修改' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('update')
  update(@Body() params: UpdateMenuDto): Promise<MenuEntity> {
    return this.service.updateMenu(params);
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
  @ApiOperation({ summary: '获取全部菜单树' })
  @Get('getAllTree')
  getMenuTree(): Promise<MenuEntity[]> {
    return this.service.getMenuTree();
  }
  /**
   * 获取当前权限菜单树
   */
  @ApiOperation({ summary: '获取当前权限菜单树' })
  @UseGuards(JwtAuthGuard)
  @Get('getTree')
  getTreeByUser(@Request() req: Request): Promise<MenuEntity[]> {
    return this.service.getMenuTreeByUser(req['user']);
  }
}
