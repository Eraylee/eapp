import { Injectable, BadRequestException } from '@nestjs/common';
import { BaseService } from '@eapp/server/core/base';
import { MenuEntity } from './menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateMenuDto, UpdateMenuDto } from './menu.dto';
import { JwtPayload } from '../auth';

@Injectable()
export class MenuService extends BaseService<MenuEntity> {
  constructor(
    @InjectRepository(MenuEntity) readonly repo: Repository<MenuEntity>,
    private dataSource: DataSource
  ) {
    super(repo);
  }
  /**
   * 根据id查询
   * @param id
   */
  public async getById(id: number): Promise<MenuEntity> {
    const treeRepo = await this.dataSource.getTreeRepository(MenuEntity);
    const menu = await treeRepo.findOneBy({ id });
    const menuWithParent = await treeRepo.findAncestorsTree(menu);
    return menuWithParent;
  }
  /**
   * 获取全部菜单树
   */
  public async getMenuTree(): Promise<MenuEntity[]> {
    // const tree = await this.treeRepo.findTrees();
    return this.dataSource.getTreeRepository(MenuEntity).findTrees();
  }

  /**
   * 新增
   * @param dto
   */
  public async createMenu({
    name,
    action,
    type,
    icon,
    path,
    parentId,
    visiable,
  }: CreateMenuDto): Promise<MenuEntity> {
    const menu = new MenuEntity();
    Object.assign(menu, { name, action, type, icon, path, visiable });
    if (parentId) {
      const parent = await this.repo.findOneBy({ id: parentId });
      if (!parent) {
        throw new BadRequestException('父级菜单不存在');
      }
      menu.parent = parent;
    }
    return await this.repo.save(menu);
  }
  /**
   * 修改
   * @param dto
   */
  public async updateMenu(dto: UpdateMenuDto): Promise<MenuEntity> {
    const menu = await this.repo.findOneBy({ id: dto.id });
    if (!menu) {
      throw new BadRequestException('菜单不存在');
    }
    Object.assign(menu, dto);
    if (dto.parentId) {
      const parent = await this.repo.findOneBy({ id: dto.parentId });
      if (!parent) {
        throw new BadRequestException('父级菜单不存在');
      }
      menu.parent = parent;
    }
    return await this.repo.save(menu);
  }
  /**
   * 获取当前用户菜单
   * @param user
   */
  public async getMenuTreeByUser(user: JwtPayload): Promise<MenuEntity[]> {
    const roles = user?.roles ?? [];
    const menus = await this.repo
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.roles', 'role')
      .leftJoinAndSelect('menu.parent', 'parent')
      .andWhere('role.code IN (:...roles)', { roles })
      .getMany();
    return await this.getTree(menus);
  }
  /**
   * 递归生成菜单树
   * @param menus
   * @param pid
   */
  private getTree(menus: MenuEntity[], pid?: number): MenuEntity[] {
    return menus
      .filter((v) => (pid ? v.parent?.id === pid : !v.parent))
      .map((v) => ({ ...v, children: this.getTree(menus, v.id) }));
  }
}
