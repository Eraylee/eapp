import { GET, POST, PaginationOptions, PaginationResult } from './base';
import { ReactText } from 'react';

export enum MenuTypes {
  LAYOUT = 1,
  API,
  ROUTE,
}

export interface Menu {
  id: number;
  sort: number;
  enabled: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  action: string;
  icon: string;
  type: number;
  path: string;
  parent: Menu;
  parentId: number;
  visiable: number;
  children: Menu[];
}

export interface Role {
  id: number;
  sort: number;
  enabled: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  code: string;
  menuIds?: number[];
  menus: Menu[];
}

export interface User {
  id: number;
  sort: number;
  enabled: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  nickname: string;
  useNo: string;
  email: string;
  phone: string;
  avatar?: string;
  roles: Role[];
  roleIds?: number[];
}
export interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface LoginReq {
  username: string;
  password: string;
}

export interface DataDictionary {
  dictionaryCode: string;
  dictionaryName: string;
  dictionaryValue: string;
  description?: string;
  parentId?: number;
  id: number;
  sort: number;
  enabled: number;
  createdAt: Date;
  updatedAt: Date;
  children: DataDictionary[];
}

export type QueryUserReq = Partial<User> & Partial<PaginationOptions>;

export type QueryRoleReq = Partial<Role> & Partial<PaginationOptions>;

export type QueryDataDictionaryReq = Partial<DataDictionary> &
  Partial<PaginationOptions>;

// ------------------------- 鉴权 --------------------------
/**
 * 登录
 * @param params
 */
export const apiAuthLlogin = (params: LoginReq): Promise<string> => {
  return POST('/auth/login', params);
};

// ------------------------- 菜单 --------------------------
/**
 * 获取个人菜单树
 */
export const apiSystemMenuGetTree = (): Promise<Menu[]> => {
  return GET('/system/menu/getTree');
};
/**
 * 获取所有菜单树
 */
export const apiSystemMenuGetAllTree = (): Promise<Menu[]> => {
  return GET('/system/menu/getAllTree');
};
/**
 * 通过id获取菜单详情
 * @param id
 */
export const apiSystemMenuQueryById = (id: number): Promise<Menu> => {
  return GET('/system/menu/queryById', { id });
};
/**
 * 新增菜单
 * @param params
 */
export const apiSystemMenuCreate = (params: Partial<Menu>): Promise<Menu> => {
  return POST('/system/menu/create', params);
};
/**
 * 修改菜单
 * @param params
 */
export const apiSystemMenuUpdate = (params: Partial<Menu>): Promise<Menu> => {
  return POST('/system/menu/update', params);
};
/**
 * 删除菜单
 * @param ids
 */
export const apiSystemMenuDeleteBatch = (ids: ReactText[]) => {
  return POST('/system/menu/deleteBatch', { ids });
};
// ------------------------- 用户 --------------------------
/**
 * 获取当前用户信息
 */
export const apiSystemUserGetProfile = (): Promise<User> => {
  return POST('/system/user/getProfile');
};
/**
 * 分页查询用户
 * @param params
 */
export const apiSystemUserQueryPage = (
  params: QueryUserReq
): Promise<PaginationResult<User>> => {
  return GET('/system/user/queryPage', params);
};
/**
 * 通过id查询用户
 * @param id
 */
export const apiSystemUserQueryById = (id: number): Promise<User> => {
  return GET('/system/user/queryById', { id });
};
/**
 * 创建用户
 * @param params
 */
export const apiSystemUserCreate = (params: Partial<User>) => {
  return POST('/system/user/create', params);
};
/**
 * 修改用户
 * @param params
 */
export const apiSystemUserUpdate = (params: Partial<User>) => {
  return POST('/system/user/update', params);
};
/**
 * 删除用户
 * @param ids
 */
export const apiSystemUserDeleteBatch = (ids: ReactText[]) => {
  return POST('/system/user/deleteBatch', { ids });
};

/**
 * 重置密码
 * @param id
 */
export const apiSystemUserResetPassword = (id: ReactText) => {
  return POST('/system/user/resetPassword', { id });
};

/**
 * 修改个人信息
 * @param params
 */
export const apiSystemUserUpdateProfile = (params: Partial<User>) => {
  return POST('/system/user/updateProfile', params);
};
/**
 * 修改密码
 * @param params
 */
export const apiSystemUserUpdatePassword = (params: UpdatePassword) => {
  return POST('/system/user/updatePassword', params);
};

// ------------------------- 角色 --------------------------
/**
 * 分页查询角色
 * @param params
 */
export const apiSystemRoleQueryPage = (
  params: QueryRoleReq
): Promise<PaginationResult<Role>> => {
  return GET('/system/role/queryPage', params);
};
/**
 * 通过id查询角色
 * @param id
 */
export const apiSystemRoleQueryById = (id: number): Promise<Role> => {
  return GET('/system/role/queryById', { id });
};
/**
 * 查询所有角色
 */
export const apiSystemRoleQueryAll = (): Promise<Role[]> => {
  return GET('/system/role/queryAll');
};
/**
 * 创建角色
 * @param params
 */
export const apiSystemRoleCreate = (params: Partial<Role>) => {
  return POST('/system/role/create', params);
};
/**
 * 修改角色
 * @param params
 */
export const apiSystemRoleUpdate = (params: Partial<Role>) => {
  return POST('/system/role/update', params);
};
/**
 * 删除角色
 * @param ids
 */
export const apiSystemRoleDeleteBatch = (ids: ReactText[]) => {
  return POST('/system/role/deleteBatch', { ids });
};

// ------------------------- 数据字典 --------------------------
/**
 * 分页查询数据字典
 * @param params
 */
export const apiSystemDataDictionaryQueryPage = (
  params: QueryDataDictionaryReq
): Promise<PaginationResult<DataDictionary>> => {
  return GET('/system/dataDictionary/queryPage', params);
};
/**
 * 通过id查询数据字典
 * @param id
 */
export const apiSystemDataDictionaryQueryById = (
  id: number
): Promise<DataDictionary> => {
  return GET('/system/dataDictionary/queryById', { id });
};
/**
 * 创建数据字典
 * @param params
 */
export const apiSystemDataDictionaryCreate = (
  params: Partial<DataDictionary>
) => {
  return POST('/system/dataDictionary/create', params);
};
/**
 * 修改数据字典
 * @param params
 */
export const apiSystemDataDictionaryUpdate = (
  params: Partial<DataDictionary>
) => {
  return POST('/system/dataDictionary/update', params);
};
/**
 * 删除数据字典
 * @param ids
 */
export const apiSystemDataDictionaryDeleteBatch = (ids: ReactText[]) => {
  return POST('/system/dataDictionary/deleteBatch', { ids });
};
/**
 * 获取所有数据字典树
 */
export const apiSystemDataDictionaryGetAllTree = (): Promise<
  DataDictionary[]
> => {
  return GET('/system/dataDictionary/getAllTree');
};
