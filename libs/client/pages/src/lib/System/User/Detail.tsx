import React, { useEffect } from 'react';

import { Form, Input, Modal, InputNumber } from 'antd';
import { OperateType } from '@eapp/types';
// import {
//   getFormValue,
//   setFormValue,
//   createOrUpdate,
//   clearFormValue,
//   getRoleDataSource,
// } from "../../../../../service/src/lib/user.service";
import { ModalOk } from '@eapp/client/hooks';
import { statusDataSource } from '@eapp/client/common';
import { ESelect, ERadio } from '@eapp/client/components';
import {
  // globalServiceActions,
  userServiceActions,
  userServiceThunk,
  useRootDispatch,
  useRootSelector,
} from '@eapp/client/service';

interface DetailProps {
  id?: number;
  confirmLoading: boolean;
  onClose: () => void;
  onOk: ModalOk;
  onRefresh: () => void;
  visible: boolean;
  operateType: OperateType;
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
export const UserDetail: React.FC<DetailProps> = ({
  onClose,
  onOk,
  visible,
  operateType,
  id,
  confirmLoading,
  onRefresh,
}) => {
  const [form] = Form.useForm();
  const dispatch = useRootDispatch();
  const { formValue, roleDataSource } = useRootSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    if (visible && operateType !== OperateType.Create && id) {
      dispatch(userServiceThunk.getFormValue(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, operateType, visible]);

  useEffect(() => {
    form.setFieldsValue(formValue);
    dispatch(userServiceActions.setFormValue(formValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue]);
  useEffect(() => {
    dispatch(userServiceThunk.getRoleDataSource());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleOk = async () => {
    try {
      const params = await form.validateFields();

      const isSuccess = await userServiceThunk.createOrUpdate(params, id);
      if (isSuccess) {
        form.resetFields();
        dispatch(userServiceActions.clearFormValue());
        onRefresh();
      }
      return isSuccess;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const close = () => {
    form.resetFields();
    dispatch(userServiceActions.clearFormValue());
    onClose();
  };
  return (
    <Modal
      getContainer={false}
      title="用户"
      visible={visible}
      onOk={onOk(handleOk)}
      confirmLoading={confirmLoading}
      onCancel={close}
    >
      <Form form={form} {...layout}>
        <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="昵称" name="nickname" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="手机号" name="phone" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="用户编号" name="userNo" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            {
              type: 'email',
              message: '邮箱不合法',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="头像" name="avatar">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="角色" name="roleIds">
          <ESelect
            placeholder="请输入"
            mode="multiple"
            dataSource={roleDataSource}
          />
        </Form.Item>

        <Form.Item label="排序" name="sort">
          <InputNumber placeholder="请输入" />
        </Form.Item>
        <Form.Item label="启用状态" name="status">
          <ERadio dataSource={statusDataSource} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
UserDetail.defaultProps = {
  confirmLoading: false,
  visible: false,
  operateType: OperateType.Create,
} as DetailProps;
