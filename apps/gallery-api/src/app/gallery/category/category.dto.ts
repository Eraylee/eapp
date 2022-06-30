import { IsNotEmpty, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from './category.entity';
import { PaginationDto, UpdateDto, CreateDto } from '@eapp/server/core/base';
// 分页查询
export class QueryCategoryDto extends PaginationDto {
  @ApiProperty({
    description: '标题',
  })
  name: string;
}
//新增
export class CreateCategoryDto
  extends CreateDto
  implements Partial<CategoryEntity>
{
  @ApiProperty({
    description: '标题',
  })
  @IsNotEmpty()
  @IsDefined()
  name: string;
}
//修改
export class UpdateCategoryDto
  extends UpdateDto
  implements Partial<CategoryEntity>
{
  @ApiProperty({
    description: '标题',
  })
  @IsNotEmpty()
  @IsDefined()
  name: string;
}
