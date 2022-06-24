import { useEffect, useState } from 'react';
import { OperateType } from '@eapp/types';
import { DataSourceItem } from '@eapp/client/common';
import { getDataDictionary } from '@eapp/client/api';

export type ModalOk = (
  cb: (e: React.MouseEvent<HTMLElement, MouseEvent>) => Promise<boolean>
) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
/**
 * 模态框管理
 */
export const useModal = () => {
  const [visible, setVisible] = useState(false);
  const [operateType, setOperateType] = useState(OperateType.Create);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const open = (type?: OperateType) => {
    if (type) {
      setOperateType(type);
    }
    setVisible(true);
  };

  const ok =
    (
      cb = (e: React.MouseEvent<HTMLElement, MouseEvent>) =>
        Promise.resolve(true)
    ) =>
    async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      setConfirmLoading(true);
      const canClose = await cb(e);
      canClose && setVisible(false);
      setConfirmLoading(false);
    };

  const close = () => {
    setVisible(false);
  };

  return { visible, confirmLoading, operateType, open, ok, close };
};
/**
 * 获取数据字典
 * @param dictionaryCode 数据字典编码
 */
export const useGetDataDictionary = (dictionaryCode: string) => {
  const [state, setState] = useState<DataSourceItem[]>([]);
  useEffect(() => {
    getDataDictionary(dictionaryCode).then((res) => res && setState(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [state];
};
