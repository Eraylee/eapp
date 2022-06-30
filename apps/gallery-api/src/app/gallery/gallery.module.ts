import { Module } from '@nestjs/common';
import { AlbumModule } from './album';
import { CategoryModule } from './category';
import { PhotoModule } from './photo';

@Module({
  imports: [AlbumModule, CategoryModule, PhotoModule],
})
export class GallerymModule {}
