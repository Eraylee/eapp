import { IsNotEmpty, IsArray, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDto, PaginationDto, UpdateDto } from '@eapp/server/core/base';
import { RoleEntity } from './role.entity';

//分页查询
export class QueryRoleDto extends PaginationDto implements Partial<RoleEntity> {
  @ApiProperty({
    description: '名称',
    required: false,
  })
  name: string;

  @ApiProperty({
    description: '编码',
    required: false,
  })
  code: string;
}
//新增
export class CreateRoleDto extends CreateDto implements Partial<RoleEntity> {
  @ApiProperty({
    description: '名称',
  })
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @ApiProperty({
    description: '菜单ids',
  })
  @IsArray()
  menuIds: number[];

  @ApiProperty({
    description: '编码',
  })
  @IsNotEmpty()
  @IsDefined()
  code: string;
}
//修改
export class UpdateRoleDto extends UpdateDto implements Partial<RoleEntity> {
  @ApiProperty({
    description: '名称',
  })
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @ApiProperty({
    description: '菜单ids',
  })
  @IsArray()
  menuIds: number[];

  @ApiProperty({
    description: '编码',
  })
  @IsNotEmpty()
  @IsDefined()
  code: string;
}
