import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Menu,
  apiSystemMenuGetTree,
  User,
  apiSystemUserGetProfile,
  apiSystemUserUpdateProfile,
  UpdatePassword,
  apiSystemUserUpdatePassword,
} from '@eapp/client/api';
import { Dispatch } from 'react';
import { message } from 'antd';

export interface TabItem {
  title: string;
  path: string;
  key: string;
}

export enum ThemeName {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface Theme {
  vars: { [key: string]: any };
  name: ThemeName;
}

export interface GobalState {
  menus: Menu[];
  tabs: TabItem[];
  activeKey: string;
  theme: Theme;
  profile: Partial<User>;
}

const initialState: GobalState = {
  menus: [],
  tabs: [{ title: '首页', path: '/dashboard', key: 'dashboard' }],
  theme: { vars: {}, name: ThemeName.LIGHT },
  activeKey: 'dashboard',
  profile: {},
};

const globalService = createSlice({
  name: 'global',
  initialState,
  reducers: {
    // 添加菜单树
    setMenuTree(state, action: PayloadAction<Menu[]>) {
      state.menus = action.payload;
    },
    // 添加标签页
    addTab(state, action: PayloadAction<TabItem>) {
      if (!state.tabs.find((i) => i.key === action.payload.key)) {
        state.tabs.push(action.payload);
      }
    },
    // 设置标签页
    setTabs(state, action: PayloadAction<TabItem[]>) {
      state.tabs = action.payload;
    },
    // 设置当前活跃tab key
    setActiveKey(state, action: PayloadAction<string>) {
      state.activeKey = action.payload;
    },
    // 删除标签页
    removeAllTabs(state) {
      state.tabs = state.tabs.filter((v, K) => K === 0);
    },
    // 删除右侧标签
    removeRightTabs(state, action: PayloadAction<string>) {
      const index = state.tabs.findIndex((v) => v.key === action.payload);
      state.tabs = state.tabs.filter((v, k) => k <= index);
    },
    // 删除其他标签
    removeOtherTabs(state, action: PayloadAction<string>) {
      state.tabs = state.tabs.filter(
        (v, K) => v.key === action.payload || K === 0
      );
    },
    // 删除全部标签页
    removeTab(state, action: PayloadAction<string>) {
      state.tabs = state.tabs.filter((v) => v.key !== action.payload);
    },
    // 设置主题
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    // 设置个人信息
    setProfile(state, action: PayloadAction<Partial<User>>) {
      state.profile = action.payload;
    },
  },
});

export const globalServiceActions = globalService.actions;

/**
 * 获取菜单树
 * @param payload
 */
const getMenuTree =
  () =>
  async (
    dispatch: Dispatch<ReturnType<typeof globalServiceActions.setMenuTree>>
  ) => {
    try {
      const menus = await apiSystemMenuGetTree();
      dispatch(globalServiceActions.setMenuTree(menus));
    } catch (error) {
      message.error('初始化菜单失败');
    }
  };
/**
 * 获取个人信息
 */
const getProfile =
  () =>
  async (
    dispatch: Dispatch<ReturnType<typeof globalServiceActions.setProfile>>
  ) => {
    try {
      const profile = await apiSystemUserGetProfile();
      dispatch(globalServiceActions.setProfile(profile));
    } catch (error) {
      message.error('获取个人信息失败');
    }
  };
/**
 * 修改个人信息
 * @param params
 */
const updateProfile = async (params: Partial<User>): Promise<boolean> => {
  try {
    await apiSystemUserUpdateProfile(params);
    message.success('修改个人信息成功');
    return true;
  } catch (error) {
    message.error('操作失败');
    return false;
  }
};
/**
 * 修改密码
 * @param params
 */
const updatePassword = async (params: UpdatePassword) => {
  try {
    await apiSystemUserUpdatePassword(params);
    message.success('修改密码成功');
    return true;
  } catch (error) {
    message.error('操作失败');
    return false;
  }
};
export const globalServiceThunk = {
  getMenuTree,
  getProfile,
  updateProfile,
  updatePassword,
};
export default globalService.reducer;
