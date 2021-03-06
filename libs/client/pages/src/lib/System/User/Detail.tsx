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
      title="??????"
      visible={visible}
      onOk={onOk(handleOk)}
      confirmLoading={confirmLoading}
      onCancel={close}
    >
      <Form form={form} {...layout}>
        <Form.Item label="?????????" name="username" rules={[{ required: true }]}>
          <Input placeholder="?????????" />
        </Form.Item>
        <Form.Item label="??????" name="nickname" rules={[{ required: true }]}>
          <Input placeholder="?????????" />
        </Form.Item>
        <Form.Item label="?????????" name="phone" rules={[{ required: true }]}>
          <Input placeholder="?????????" />
        </Form.Item>
        <Form.Item label="????????????" name="userNo" rules={[{ required: true }]}>
          <Input placeholder="?????????" />
        </Form.Item>
        <Form.Item
          name="email"
          label="??????"
          rules={[
            {
              type: 'email',
              message: '???????????????',
            },
          ]}
        >
          <Input placeholder="?????????" />
        </Form.Item>
        <Form.Item label="??????" name="avatar">
          <Input placeholder="?????????" />
        </Form.Item>
        <Form.Item label="??????" name="roleIds">
          <ESelect
            placeholder="?????????"
            mode="multiple"
            dataSource={roleDataSource}
          />
        </Form.Item>

        <Form.Item label="??????" name="sort">
          <InputNumber placeholder="?????????" />
        </Form.Item>
        <Form.Item label="????????????" name="status">
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
