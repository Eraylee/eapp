import { Injectable, BadRequestException } from '@nestjs/common';
import { AlbumEntity } from './album.entity';
import { CategoryEntity } from '../category';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
// import pick from 'lodash/pick'
import { BaseService } from '@eapp/server/core/base';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { ConfigService } from '@nestjs/config';
import { PhotoEntity } from '../photo';
// import { JwtAuthGuard } from '@eapp/server/core/guards';
@Injectable()
export class AlbumService extends BaseService<AlbumEntity> {
  constructor(
    @InjectRepository(AlbumEntity) readonly repo: Repository<AlbumEntity>,
    @InjectRepository(PhotoEntity) readonly photoRepo: Repository<PhotoEntity>,
    @InjectRepository(CategoryEntity)
    readonly categoryRepo: Repository<CategoryEntity>,
    private readonly config: ConfigService
  ) {
    super(repo);
  }
  /**
   * 新增
   * @param params
   */
  async createAlbum({
    photoIds,
    categoryId,
    ...rest
  }: CreateAlbumDto): Promise<AlbumEntity> {
    const albumEntity = new AlbumEntity();
    Object.assign(albumEntity, rest);
    const photos = await this.photoRepo.findBy({
      id: In(photoIds),
    });
    albumEntity.photos = photos;
    const category = await this.categoryRepo.findOneBy({ id: categoryId });
    if (!category) {
      throw new BadRequestException('分类不存在');
    }
    albumEntity.category = category;

    return this.repo.save(albumEntity);
  }
  /**
   * 修改
   * @param params
   */
  async updateAlbum({
    id,
    photoIds,
    categoryId,
    ...rest
  }: UpdateAlbumDto): Promise<AlbumEntity> {
    const albumEntity = await this.repo.findOneBy({ id });
    Object.assign(albumEntity, rest);
    const photos = await this.photoRepo.findBy({
      id: In(photoIds),
    });
    albumEntity.photos = photos;
    if (categoryId) {
      const category = await this.categoryRepo.findOneBy({ id: categoryId });
      if (!category) {
        throw new BadRequestException('分类不存在');
      }
      albumEntity.category = category;
    }
    return await this.repo.save(albumEntity);
  }
}
