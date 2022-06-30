import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoEntity } from './photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoEntity])],
  providers: [PhotoService],
  exports: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
