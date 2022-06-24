import {
  IsArray,
  IsNumber,
  IsEnum,
  IsNotEmpty,
  IsDefined,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { OrderTypes, Status } from '@eapp/types';

/**
 * 批量删除
 */
export class DeletBatcheDto {
  @ApiProperty({ description: 'ids' })
  @IsArray()
  readonly ids: number[];
}
/**
 * 删除
 */
export class DeleteDto {
  @ApiProperty({ description: 'id' })
  @IsNotEmpty()
  @IsDefined()
  readonly id: number;
}
/**
 * 分页查询
 */
export class PaginationDto {
  @ApiProperty({ required: false, description: '页码' })
  @IsNumber()
  @Transform((params) => parseInt(params.value))
  readonly pageNum?: number;

  @ApiProperty({ required: false, description: '每页显示多少' })
  @IsNumber()
  @Transform((params) => parseInt(params.value))
  readonly pageSize?: number;

  @ApiProperty({ required: false, description: '排序字段' })
  readonly orderColumn?: string;

  @ApiProperty({ required: false, description: '排序方式' })
  @IsEnum(OrderTypes)
  readonly orderType?: OrderTypes;
}

export class CreateDto {
  @ApiProperty({
    description: '排序',
  })
  sort: number;

  @ApiProperty({
    description: '状态',
  })
  status: Status;

  @ApiProperty({
    description: '描述',
  })
  description: string;
}

export class UpdateDto extends CreateDto {
  @ApiProperty({
    description: 'id',
  })
  @IsNotEmpty()
  @IsDefined()
  id: number;
}
