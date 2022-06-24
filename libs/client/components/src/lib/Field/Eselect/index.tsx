import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import { DataSourceItem } from '@eapp/client/common';
import { getDataDictionary } from '@eapp/client/api';

const Option = Select.Option;

export interface ESelectProps<T> extends SelectProps<T> {
  dataSource?: DataSourceItem[];
  dictionaryCode?: string;
}
/**
 * 获取选择选项
 * @param dataSource 数据源
 */
export const getOptions = (dataSource: DataSourceItem[]) => {
  return dataSource.map((v) => (
    <Option key={v.value} value={v.value}>
      {v.label}
    </Option>
  ));
};

export const ESelect: React.FC<ESelectProps<string>> = ({
  dataSource,
  dictionaryCode,
  ...rest
}) => {
  const [_dataSource, setDataSource] = useState<DataSourceItem[]>([]);

  useEffect(() => {
    dataSource && setDataSource(dataSource);
  }, [dataSource]);
  // 如果有数据字典编码
  // 获取数据字典
  useEffect(() => {
    if (dictionaryCode) {
      getDataDictionary(dictionaryCode).then(
        (res) => res && setDataSource(res)
      );
    }
  }, [dictionaryCode]);
  return <Select {...rest}>{getOptions(_dataSource)}</Select>;
};

ESelect.defaultProps = {
  dataSource: [],
  allowClear: true,
} as ESelectProps<string>;
