import { Get, Post, Body, Param } from '@nestjs/common';
import { DeletBatcheDto } from './base.dto';
import { BaseService } from './base.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
// import { BaseControllerOptions } from '../interface/Controller.interface';

export class BaseController<T> {
  constructor(public baseService: BaseService<T>) {}
  // /**
  //  * 分页查询
  //  * @param query
  //  */
  // @ApiOperation({ summary: '分页查询' })
  // @Get('queryPage')
  // public async getMany(
  //   @Query() query: PaginationDto,
  // ): Promise<PaginationResult<T>> {
  //   return await this.baseService.getPage(query);
  // }
  /**
   * 通过id查询
   * @param id
   */
  @ApiOperation({ summary: '通过id查询' })
  @Get('queryById')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  public async getOne(@Param('id') id: number) {
    return await this.baseService.get({ id } as any);
  }
  /**
   * 删除
   * @param ids
   */
  @ApiOperation({ summary: '删除' })
  @Post('deleteBatch')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  public async deleteBatch(
    @Body() body: DeletBatcheDto
  ): Promise<DeleteResult> {
    return await this.baseService.deleteBatch(body);
  }
}
