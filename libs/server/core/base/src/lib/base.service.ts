import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { PaginationDto, DeletBatcheDto } from './base.dto';
import { PaginationResult } from '@eapp/types';
import { OrderTypes } from '@eapp/types';

export abstract class BaseService<T> {
  protected constructor(protected readonly repo: Repository<T>) {}
  /**
   * 查询单条数据
   * @param id
   */
  public async get(
    where: FindOptionsWhere<T> | FindOptionsWhere<T>[]
  ): Promise<T | null> {
    return await this.repo.findOneBy(where);
  }
  /**
   * 分页查询
   * @param query
   */
  public async getPage<D extends PaginationDto>({
    pageSize,
    pageNum,
    orderType,
    orderColumn,
    ...query
  }: D): Promise<PaginationResult<T>> {
    const take = pageSize ?? 10;
    const page = pageNum ?? 1;
    const skip = take * (page - 1);
    const _orderType: OrderTypes = orderType ?? OrderTypes.DESC;
    const _orderColumn = orderColumn ?? 'createdAt';
    const order: any = {
      [_orderColumn]: _orderType,
    };
    const where: any = {};
    Reflect.ownKeys(query).forEach((queryKey) => {
      const queryValue = (query as any)[queryKey];
      if (queryKey === 'parentId') {
        Object.assign(where, { parent: { id: queryValue } });
      } else {
        where[queryKey] = Like(`%${queryValue}%`);
      }
    });
    const [data, total] = await this.repo.findAndCount({
      order,
      skip,
      take,
      where,
    });
    return {
      data,
      total,
      pageNum: page,
      pageSize: take,
      maxPage: Math.ceil(total / take),
    };
  }
  /**
   * 创建
   * @param dto
   */
  public async create<D extends T>(dto: D) {
    return await this.repo.save(this.repo.create(dto));
  }
  /**
   * 修改
   * @param id
   * @param dto
   */
  public async update<D extends T & { id: number }>(dto: D) {
    return await this.repo.update(dto.id, dto);
  }
  /**
   * 批量删除
   * @param ids
   */
  public async deleteBatch(params: DeletBatcheDto) {
    return this.repo.softDelete(params.ids);
  }
}
