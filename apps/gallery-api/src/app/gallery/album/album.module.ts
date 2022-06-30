import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { CategoryEntity } from '../category';
import { PhotoEntity } from '../photo';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity, CategoryEntity, PhotoEntity]),
  ],
  providers: [AlbumService],
  exports: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}
