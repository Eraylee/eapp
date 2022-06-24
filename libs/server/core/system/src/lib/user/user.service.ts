import { Injectable, BadRequestException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import pick from 'lodash/pick'
import * as crypto from 'crypto';
import { BaseService } from '@eapp/server/core/base';
import {
  CreateUserDto,
  ResetPswDto,
  UpdateUserDto,
  UpdatePswDto,
} from './user.dto';
import { ConfigService } from '@nestjs/config';
import { RoleEntity } from '../role';
// import { JwtAuthGuard } from '@eapp/server/core/guards';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) readonly repo: Repository<UserEntity>,
    private readonly config: ConfigService,
    @InjectRepository(RoleEntity)
    private readonly roleRepe: Repository<RoleEntity>
  ) {
    super(repo);
  }
  /**
   * 验证用户
   * @param username
   * @param password
   */
  public async validate(
    username: string,
    password: string
  ): Promise<UserEntity | undefined> {
    return this.repo.findOneBy({
      username,
      password: this.buildPassword(password),
    });
  }
  /**
   * 新增用户
   * @param params
   */
  public async createUser({
    username,
    roleIds,
    ...rest
  }: CreateUserDto): Promise<UserEntity> {
    const count = await this.repo.countBy({ username });
    if (count > 0) {
      throw new BadRequestException('用户名已存在');
    }
    const user = new UserEntity();
    let roles = [];
    if (roleIds) {
      roles = await this.roleRepe.findByIds(roleIds);
    }
    const password = this.buildPassword(
      this.config.get('app.DEFAULT_PASSWORD')
    );
    Object.assign(user, { ...rest, username, password, roles });
    return this.repo.save(user);
  }
  /**
   * 更新用户
   * @param params
   */
  public async updateUser({
    id,
    roleIds,
    nickname,
    email,
    phone,
    avatar,
    userNo,
  }: UpdateUserDto): Promise<UserEntity> {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    let roles = [];
    if (roleIds) {
      roles = await this.roleRepe.findByIds(roleIds);
    }
    Object.assign(user, { nickname, email, phone, avatar, roles, userNo });
    return this.repo.save(user);
  }
  /**
   * 重置密码
   * @param params
   */
  public async resetPassWord({ id }: ResetPswDto): Promise<UserEntity> {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    const password = this.buildPassword(
      this.config.get('app.DEFAULT_PASSWORD')
    );
    Object.assign(user, { password });
    return this.repo.save(user);
  }
  /**
   * 加密密码
   * @param password
   */
  private buildPassword(password: string): string {
    return crypto.createHmac('sha256', password).digest('hex');
  }

  /**
   * 更新个人用户信息
   * @param id
   * @param params
   */
  public async updateProfile(
    id: number,
    params: UpdateUserDto
  ): Promise<UserEntity> {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    const { nickname, phone, email } = params;
    Object.assign(user, { nickname, phone, email });
    return this.repo.save(user);
  }
  /**
   * 修改用户密码
   * @param id
   * @param param1
   */
  public async updatePassword(
    id: number,
    { oldPassword, newPassword }: UpdatePswDto
  ): Promise<UserEntity> {
    const user = await this.repo.findOneBy({
      id,
      password: this.buildPassword(oldPassword),
    });
    if (!user) {
      throw new BadRequestException('校验失败');
    }
    Object.assign(user, { password: this.buildPassword(newPassword) });
    return this.repo.save(user);
  }
}
