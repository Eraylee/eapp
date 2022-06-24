import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  apiSystemDataDictionaryDeleteBatch,
  apiSystemDataDictionaryQueryById,
  apiSystemDataDictionaryCreate,
  apiSystemDataDictionaryUpdate,
  DataDictionary,
  apiSystemDataDictionaryGetAllTree,
} from '@eapp/client/api';
import { message } from 'antd';
import { Dispatch, ReactText } from 'react';
import produce from 'immer';
import { DataNode } from 'antd/lib/tree';
import { TreeDataSourceItem } from '@eapp/client/common';

export interface DataDictionaryState {
  treeData: (DataNode & TreeDataSourceItem)[];
  formValue: Partial<DataDictionary>;
}

const initialState: DataDictionaryState = {
  treeData: [],
  formValue: {},
};

const dataDictionaryService = createSlice({
  name: 'systemDataDictionary',
  initialState,
  reducers: {
    setFormValue(state, action: PayloadAction<Partial<DataDictionary>>) {
      state.formValue = action.payload;
    },
    clearFormValue(state) {
      state.formValue = {};
    },
    setTreeData(
      state,
      action: PayloadAction<(DataNode & TreeDataSourceItem)[]>
    ) {
      state.treeData = action.payload;
    },
  },
});

export const dataDictionaryServiceActions = dataDictionaryService.actions;

/**
 * 获取表单详情
 */
const getFormValue =
  (id: number) =>
  async (
    dispatch: Dispatch<
      ReturnType<typeof dataDictionaryServiceActions.setFormValue>
    >
  ) => {
    try {
      const data = await apiSystemDataDictionaryQueryById(id);
      dispatch(dataDictionaryServiceActions.setFormValue(data));
    } catch (error) {
      message.error('获取数据失败');
    }
  };
/**
 * 新增或者修改
 * @param params
 */
const createOrUpdate = async (
  params: Partial<DataDictionary>,
  id?: number
): Promise<boolean> => {
  try {
    //有id为修改
    if (id) {
      const updateForvValue = produce(params, (p: Partial<DataDictionary>) => {
        p.id = id;
      });
      await apiSystemDataDictionaryUpdate(updateForvValue);
    } else {
      await apiSystemDataDictionaryCreate(params);
    }
    message.success(`${id ? '修改' : '新增'}成功`);
    return true;
  } catch (error) {
    console.error(error);
    message.error(`${id ? '修改' : '新增'}失败`);
    return false;
  }
};

/**
 * 获取字典树
 * @param payload
 */
const getDataDictionaryTree =
  () =>
  async (
    dispatch: Dispatch<
      ReturnType<typeof dataDictionaryServiceActions.setTreeData>
    >
  ) => {
    try {
      const dataDictionarys = await apiSystemDataDictionaryGetAllTree();
      const treeData = getTreeData(dataDictionarys);
      dispatch(dataDictionaryServiceActions.setTreeData(treeData));
    } catch (error) {
      message.error('初始化菜单失败');
    }
  };
const remove = async (ids: ReactText[]) => {
  try {
    await apiSystemDataDictionaryDeleteBatch(ids);
    message.success(`删除成功`);
  } catch (error) {
    console.error(error);
    message.error(`删除失败`);
  }
};
//递归获取子节点数据
const getTreeData = (
  rawData: DataDictionary[]
): (DataNode & TreeDataSourceItem)[] => {
  return rawData.map((v) => ({
    key: v.id,
    name: v.dictionaryName,
    id: v.id,
    title: v.dictionaryName,
    children: getTreeData(v.children),
  }));
};
// //递归获取数据源
// const getTreeData = (rawData: DataDictionary[]): DataNode[] => {
//   return rawData.map((v) => ({
//     key: v.id,
//     title: v.dictionaryName,
//     children: getTreeData(v.children),
//   }));
// };
export const dataDictionaryServiceThunks = {
  getFormValue,
  createOrUpdate,
  getDataDictionaryTree,
  remove,
  getTreeData,
};

export default dataDictionaryService.reducer;
