import { Injectable, BadRequestException } from '@nestjs/common';
import { BaseService } from '@eapp/server/core/base';
import { DataDictionaryEntity } from './data-dictionary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import {
  CreateDataDictionaryDto,
  UpdateDataDictionaryDto,
} from './data-dictionary.dto';

@Injectable()
export class DataDictionaryService extends BaseService<DataDictionaryEntity> {
  constructor(
    @InjectRepository(DataDictionaryEntity)
    readonly repo: Repository<DataDictionaryEntity>,
    @InjectRepository(DataDictionaryEntity)
    readonly treeRepo: TreeRepository<DataDictionaryEntity>
  ) {
    super(repo);
  }
  /**
   * 根据id查询
   * @param id
   */
  public async getById(id: number): Promise<DataDictionaryEntity> {
    const dataDictionary = await this.treeRepo.findOneBy({ id });
    const dataDictionaryWithParent = await this.treeRepo.findAncestorsTree(
      dataDictionary
    );
    return dataDictionaryWithParent;
  }
  /**
   * 获取全部菜单树
   */
  public async getDataDictionaryTree(): Promise<DataDictionaryEntity[]> {
    const tree = await this.treeRepo.findTrees();
    return tree;
  }
  /**
   * 新增字典
   * @param params
   */
  async createDataDictionary({
    parentId,
    ...params
  }: CreateDataDictionaryDto): Promise<DataDictionaryEntity> {
    const dataDictionary = new DataDictionaryEntity();
    Object.assign(dataDictionary, { ...params });
    if (parentId) {
      const parent = await this.repo.findOneBy({ id: parentId });
      if (!parent) {
        throw new BadRequestException('父级字典不存在');
      }
      dataDictionary.parent = parent;
    }
    return await this.repo.save(dataDictionary);
  }
  /**
   * 修改
   * @param params
   */
  async updateDataDictionary({
    id,
    parentId,
    ...params
  }: UpdateDataDictionaryDto): Promise<DataDictionaryEntity> {
    const dataDictionary = await this.repo.findOneBy({ id });
    Object.assign(dataDictionary, { ...params });
    if (parentId) {
      const parent = await this.repo.findOneBy({ id: parentId });
      if (!parent) {
        throw new BadRequestException('父级字典不存在');
      }
      dataDictionary.parent = parent;
    }
    return await this.repo.save(dataDictionary);
  }
}
