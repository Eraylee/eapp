import React from 'react';
import { Radio } from 'antd';
import { RadioGroupProps } from 'antd/lib/radio';
import { DataSourceItem } from '@eapp/client/common';
export interface ERadioProps extends RadioGroupProps {
  dataSource: DataSourceItem[];
}
const getOptions = (dataSource: DataSourceItem[]) => {
  return dataSource.map((v) => (
    <Radio key={v.value} value={v.value}>
      {v.label}
    </Radio>
  ));
};

export const ERadio = ({ dataSource, ...rest }: ERadioProps) => {
  return <Radio.Group {...rest}>{getOptions(dataSource)}</Radio.Group>;
};
ERadio.defaultProps = {
  dataSource: [],
  allowClear: true,
} as ERadioProps;
