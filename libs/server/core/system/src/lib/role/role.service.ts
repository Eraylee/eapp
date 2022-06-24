import { Injectable, BadRequestException } from '@nestjs/common';
import { BaseService } from '@eapp/server/core/base';
import { RoleEntity } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UpdateRoleDto, CreateRoleDto } from './role.dto';
import { MenuEntity } from '../menu';
import { CasbinService } from '@eapp/server/core/casbin';

@Injectable()
export class RoleService extends BaseService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity) readonly repo: Repository<RoleEntity>,
    @InjectRepository(MenuEntity) readonly menuRepo: Repository<MenuEntity>,
    private readonly casbin: CasbinService
  ) {
    super(repo);
  }
  /**
   * 获取全部
   */
  async getAll(): Promise<RoleEntity[]> {
    const roles = await this.repo.find();
    return roles;
  }
  /**
   * 新增角色
   * @param params
   */
  async createRole(params: CreateRoleDto): Promise<RoleEntity> {
    const count = await this.repo.countBy({ code: params.code });
    if (count > 0) {
      throw new BadRequestException('角色编码已存在');
    }
    const role = new RoleEntity();
    let menus: MenuEntity[] = [];
    Object.assign(role, { ...params, menus });
    if (params.menuIds) {
      menus = await this.menuRepo.findBy({ id: In(params.menuIds) });
      const policy = menus.map((v) => [role.code, v.path, v.action]);
      const success = await this.casbin.enforcer.addPolicies(policy);
      if (!success) {
        throw new BadRequestException('保存策略失败');
      }
    }
    return await this.repo.save(role);
  }
  /**
   * 修改
   * @param params
   */
  async updateRole(params: UpdateRoleDto): Promise<RoleEntity> {
    const role = await this.repo.findOneBy({ id: params.id });
    let menus: MenuEntity[] = [];
    if (params.menuIds) {
      menus = await this.menuRepo.findByIds(params.menuIds);
      const filteredPolicy = await this.casbin.enforcer.getFilteredPolicy(
        0,
        role.code
      );
      const addPolicies = menus.map((v) => [role.code, v.path, v.action]);
      const success = await this.casbin.enforcer.removePolicies(filteredPolicy);
      if (!success) {
        throw new BadRequestException('更新策略失败');
      }
      const addSuccess = await this.casbin.enforcer.addPolicies(addPolicies);
      if (!addSuccess) {
        throw new BadRequestException('更新策略失败');
      }
    }
    Object.assign(role, { ...params, menus });
    return await this.repo.save(role);
  }
}
