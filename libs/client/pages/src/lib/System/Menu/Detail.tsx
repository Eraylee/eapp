import React, { useEffect } from 'react';

import { Form, Input, Modal, InputNumber } from 'antd';
import { OperateType } from '@eapp/types';
// import { getFormValue, createOrUpdate, clearFormValue } from './store';
import {
  menuServiceActions,
  // globalServiceActions,
  menuServiceThunk,
  useRootDispatch,
  useRootSelector,
} from '@eapp/client/service';
import { ModalOk } from '@eapp/client/hooks';
import { ERadio, ETreeSelect, ESelect } from '@eapp/client/components';

interface DetailProps {
  id?: number;
  confirmLoading: boolean;
  onClose: () => void;
  onOk: ModalOk;
  visible: boolean;
  operateType: OperateType;
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
export const MenuDetail = ({
  onClose,
  onOk,
  visible,
  operateType,
  id,
  confirmLoading,
}: DetailProps) => {
  const [form] = Form.useForm();
  const dispatch = useRootDispatch();
  const { formValue, menus } = useRootSelector((state) => state.menuReducer);

  useEffect(() => {
    if (visible && operateType !== OperateType.Create && id) {
      dispatch(menuServiceThunk.getFormValue(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, operateType, visible]);

  useEffect(() => {
    form.setFieldsValue(formValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue]);

  const handleOk = async () => {
    try {
      const params = await form.validateFields();
      const isSuccess = !!(await dispatch(
        menuServiceThunk.createOrUpdate(params, id)
      ));
      if (isSuccess) {
        form.resetFields();
        dispatch(menuServiceActions.clearFormValue());
      }
      return isSuccess;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const close = () => {
    form.resetFields();
    dispatch(menuServiceActions.clearFormValue());
    onClose();
  };
  return (
    <Modal
      getContainer={false}
      title="菜单"
      visible={visible}
      onOk={onOk(handleOk)}
      confirmLoading={confirmLoading}
      onCancel={close}
    >
      <Form form={form} {...layout}>
        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="类型" name="type" rules={[{ required: true }]}>
          <ESelect
            dataSource={[
              {
                label: '布局',
                value: 1,
              },
              {
                label: '接口',
                value: 2,
              },
              {
                label: '路由',
                value: 3,
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="路径" name="path">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="方法" name="action">
          <ERadio
            dataSource={[
              {
                label: 'GET',
                value: 'GET',
              },
              {
                label: 'POST',
                value: 'POST',
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="图标" name="icon">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="父级菜单" name={['parent', 'id']}>
          <ETreeSelect placeholder="请输入" dataSource={menus} />
        </Form.Item>
        <Form.Item label="排序" name="sort">
          <InputNumber placeholder="请输入" />
        </Form.Item>
        <Form.Item label="显示状态" name="visiable">
          <ERadio
            dataSource={[
              {
                label: '显示',
                value: 1,
              },
              {
                label: '隐藏',
                value: 2,
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
MenuDetail.defaultProps = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose: () => {},
  confirmLoading: false,
  visible: false,
  operateType: OperateType.Create,
} as DetailProps;
