import { Test, TestingModule } from '@nestjs/testing';
import { DataDictionaryService } from './data-dictionary.service';

describe('DataDictionaryService', () => {
  let service: DataDictionaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataDictionaryService],
    }).compile();

    service = module.get<DataDictionaryService>(DataDictionaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
