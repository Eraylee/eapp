import { Injectable } from '@nestjs/common';
import { PhotoEntity } from './photo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import pick from 'lodash/pick'
import { BaseService } from '@eapp/server/core/base';
// import { CreatePhotoDto } from './photo.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PhotoService extends BaseService<PhotoEntity> {
  constructor(
    @InjectRepository(PhotoEntity) readonly repo: Repository<PhotoEntity>,
    private readonly config: ConfigService
  ) {
    super(repo);
  }
}
