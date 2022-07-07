import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  apiSystemMenuGetAllTree,
  apiSystemMenuDeleteBatch,
  apiSystemMenuQueryById,
  apiSystemMenuUpdate,
  apiSystemMenuCreate,
  Menu,
} from '@eapp/client/api';
import { message } from 'antd';
import { Dispatch, ReactText } from 'react';
import produce from 'immer';

export interface MenuState {
  menus: Menu[];
  formValue: Partial<Menu>;
}
const initialState: MenuState = {
  menus: [],
  formValue: {},
};

const menuService = createSlice({
  name: 'systemMenu',
  initialState,
  reducers: {
    setMenuTreeData(state, action: PayloadAction<Menu[]>) {
      state.menus = action.payload;
    },
    setFormValue(state, action: PayloadAction<Partial<Menu>>) {
      state.formValue = action.payload;
    },
    clearFormValue(state) {
      state.formValue = initialState.formValue;
    },
  },
});

export const menuServiceActions = menuService.actions;

const getMenuTreeData =
  () =>
  async (
    dispatch: Dispatch<ReturnType<typeof menuServiceActions.setMenuTreeData>>
  ) => {
    try {
      const data = await apiSystemMenuGetAllTree();
      dispatch(menuServiceActions.setMenuTreeData(data));
    } catch (error) {
      message.error('获取数据失败');
    }
    return false;
  };
/**
 * 获取表单详情
 */
const getFormValue =
  (id: number) =>
  async (
    dispatch: Dispatch<ReturnType<typeof menuServiceActions.setFormValue>>
  ) => {
    try {
      const data = await apiSystemMenuQueryById(id);
      dispatch(menuServiceActions.setFormValue(data));
    } catch (error) {
      message.error('获取数据失败');
    }
    return false;
  };
/**
 * 新增或者修改
 * @param params
 */
const createOrUpdate =
  (params: Partial<Menu>, id?: number) =>
  async (dispatch: Dispatch<ReturnType<typeof getMenuTreeData>>) => {
    try {
      //有id为修改
      if (id) {
        const updateForvValue = produce(params, (p: Partial<Menu>) => {
          p.id = id;
        });
        await apiSystemMenuUpdate(updateForvValue);
      } else {
        await apiSystemMenuCreate(params);
      }
      dispatch(getMenuTreeData());
      message.success(`${id ? '修改' : '新增'}成功`);
      return true;
    } catch (error) {
      console.error(error);
      message.error(`${id ? '修改' : '新增'}失败`);
      return false;
    }
  };

const remove =
  (ids: ReactText[]) =>
  async (dispatch: Dispatch<ReturnType<typeof getMenuTreeData>>) => {
    try {
      await apiSystemMenuDeleteBatch(ids);
      dispatch(getMenuTreeData());
      message.success(`删除成功`);
    } catch (error) {
      console.error(error);
      message.error(`删除失败`);
    }
  };
export const menuServiceThunk = {
  getMenuTreeData,
  getFormValue,
  createOrUpdate,
  remove,
};
export default menuService.reducer;
