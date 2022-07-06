import {
  IsNotEmpty,
  IsPhoneNumber,
  IsEmail,
  IsArray,
  IsDefined,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { PaginationDto, UpdateDto } from '@eapp/server/core/base';
// 分页查询
export class QueryUserDto extends PaginationDto implements Partial<UserEntity> {
  @ApiProperty({
    description: '用户名',
    required: false,
  })
  username: string;

  @ApiProperty({
    description: '昵称',
    required: false,
  })
  nickname: string;

  @ApiProperty({
    description: '手机号码',
    required: false,
  })
  phone: string;

  @ApiProperty({
    description: '邮箱',
    required: false,
  })
  email: string;
}
//新增
export class CreateUserDto implements Partial<UserEntity> {
  @ApiProperty({
    description: '用户名',
  })
  @IsNotEmpty()
  @IsDefined()
  username: string;

  @ApiProperty({
    description: '昵称',
  })
  @IsNotEmpty()
  @IsDefined()
  nickname: string;

  @ApiProperty({
    description: '手机号码',
  })
  @IsPhoneNumber('CN')
  @IsNotEmpty()
  @IsDefined()
  phone: string;

  @ApiProperty({
    description: '邮箱',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '角色ids',
  })
  @IsArray()
  roleIds: number[];

  @ApiProperty({
    description: '头像',
  })
  avatar: string;
}
// 修改
export class UpdateUserDto implements Partial<UserEntity> {
  @ApiProperty({
    description: '用户id',
  })
  id: number;

  @ApiProperty({
    description: '昵称',
  })
  nickname: string;

  @ApiProperty({
    description: '手机号码',
  })
  @IsPhoneNumber('CN')
  phone: string;

  @ApiProperty({
    description: '邮箱',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '头像',
  })
  avatar: string;

  @ApiProperty({
    description: '角色ids',
  })
  @IsArray()
  roleIds: number[];
}
// 修改密码
export class UpdatePswDto extends UpdateDto implements Partial<UserEntity> {
  @ApiProperty({
    description: '原始密码',
  })
  @IsNotEmpty()
  @IsDefined()
  oldPassword: string;

  @ApiProperty({
    description: '新密码',
  })
  @IsNotEmpty()
  @IsDefined()
  newPassword: string;
}
// 重置密码
export class ResetPswDto {
  @ApiProperty({
    description: '用户id',
  })
  @IsNotEmpty()
  @IsDefined()
  id: number;
}
