import { IsNotEmpty, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDto, PaginationDto, UpdateDto } from '@eapp/server/core/base';
import { DataDictionaryEntity } from './data-dictionary.entity';
//分页查询
export class QueryDataDictionaryDto extends PaginationDto
  implements Partial<DataDictionaryEntity> {
  @ApiProperty({
    description: '字典名称',
    required: false,
  })
  dictionaryName: string;

  @ApiProperty({
    description: '字典编码',
    required: false,
  })
  dictionaryCode: string;

  @ApiProperty({
    description: '字典值',
    required: false,
  })
  dictionaryValue: string;

  @ApiProperty({
    description: '父级id',
    required: false,
  })
  parentId: number;
}
//新增
export class CreateDataDictionaryDto extends CreateDto implements Partial<DataDictionaryEntity> {
  @ApiProperty({
    description: '字典名称',
    required: false,
  })
  @IsDefined()
  @IsNotEmpty()
  dictionaryName: string;

  @ApiProperty({
    description: '字典编码',
    required: false,
  })
  @IsDefined()
  @IsNotEmpty()
  dictionaryCode: string;

  @ApiProperty({
    description: '字典值',
    required: false,
  })
  @IsDefined()
  @IsNotEmpty()
  dictionaryValue: string;

  @ApiProperty({
    description: '父级id',
    required: false,
  })
  parentId: number;
}
//修改
export class UpdateDataDictionaryDto extends UpdateDto
  implements Partial<DataDictionaryEntity> {
  @ApiProperty({
    description: '字典名称',
    required: false,
  })
  @IsDefined()
  @IsNotEmpty()
  dictionaryName: string;

  @ApiProperty({
    description: '字典编码',
    required: false,
  })
  @IsDefined()
  @IsNotEmpty()
  dictionaryCode: string;

  @ApiProperty({
    description: '字典值',
    required: false,
  })
  @IsDefined()
  @IsNotEmpty()
  dictionaryValue: string;

  @ApiProperty({
    description: '父级id',
    required: false,
  })
  parentId: number;
}
