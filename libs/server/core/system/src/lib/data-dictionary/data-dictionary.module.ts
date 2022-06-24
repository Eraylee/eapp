import { Module } from '@nestjs/common';
import { DataDictionaryService } from './data-dictionary.service';
import { DataDictionaryController } from './data-dictionary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataDictionaryEntity } from './data-dictionary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataDictionaryEntity])],
  providers: [DataDictionaryService],
  controllers: [DataDictionaryController],
})
export class DataDictionaryModule {}
