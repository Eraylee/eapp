import { apiSystemDataDictionaryQueryPage, DataDictionary } from './system';
import { DataSourceItem } from '@eapp/client/common';

/**
 * 转换数据字典
 * @param data 数据字典原始值
 */
const buildDataDictionary = (data: DataDictionary[]): DataSourceItem[] => {
  return data.map((v) => ({
    value: v.dictionaryValue,
    label: v.dictionaryName,
  }));
};

/**
 * 获取数据字典
 * @param dictionaryCode 字典编码
 */
export const getDataDictionary = async (dictionaryCode: string) => {
  try {
    const res = await apiSystemDataDictionaryQueryPage({ dictionaryCode });
    return buildDataDictionary(res.data);
  } catch (error) {
    console.error('getDataDictionary', error);
  }
  return [];
};
