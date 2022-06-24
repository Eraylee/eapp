import { Test, TestingModule } from '@nestjs/testing';
import { DataDictionaryController } from './data-dictionary.controller';

describe('DataDictionaryController', () => {
  let controller: DataDictionaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataDictionaryController],
    }).compile();

    controller = module.get<DataDictionaryController>(DataDictionaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
