import React from 'react';
import { ModalOk } from '@eapp/client/hooks';
import { Form, Input, Modal } from 'antd';

import { globalServiceThunk } from '@eapp/client/service';
interface UpdatePasswordProps {
  confirmLoading: boolean;
  onClose: () => void;
  onOk: ModalOk;
  visible: boolean;
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
export const UpdatePassword: React.FC<UpdatePasswordProps> = ({
  onOk,
  visible,
  onClose,
  confirmLoading,
}) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const params = await form.validateFields();
      const isSuccess = await globalServiceThunk.updatePassword(params as any);
      if (isSuccess) {
        form.resetFields();
        // dispatch(setFormValue({}));
      }
      return isSuccess;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const close = () => {
    form.resetFields();
    // dispatch(setFormValue({}));
    onClose();
  };
  return (
    <Modal
      getContainer={false}
      title="修改密码"
      visible={visible}
      onOk={onOk(handleOk)}
      confirmLoading={confirmLoading}
      onCancel={close}
    >
      <Form form={form} {...layout}>
        <Form.Item
          label="原密码"
          name="oldPassword"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="新密码"
          hasFeedback
          name="newPassword"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          hasFeedback
          dependencies={['newPassword']}
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('确认密码与新密码不匹配');
              },
            }),
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
