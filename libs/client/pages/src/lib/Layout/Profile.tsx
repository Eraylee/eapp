import React, { useEffect } from 'react';
import { ModalOk } from '@eapp/client/hooks';
import { Form, Input, Modal } from 'antd';
// import { getProfile, updateProfile } from "../../../../service/src/lib/global.service";
import {
  // globalServiceActions,
  globalServiceThunk,
  useRootDispatch,
  useRootSelector,
} from '@eapp/client/service';

interface ProfileProps {
  id?: number;
  confirmLoading: boolean;
  onClose: () => void;
  onOk: ModalOk;
  visible: boolean;
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
export const Profile: React.FC<ProfileProps> = ({
  onOk,
  visible,
  onClose,
  confirmLoading,
}) => {
  const [form] = Form.useForm();
  const { profile } = useRootSelector((state) => state.globalReducer);
  const dispatch = useRootDispatch();
  useEffect(() => {
    if (visible) {
      dispatch(globalServiceThunk.getProfile());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    form.setFieldsValue(profile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);
  const handleOk = async () => {
    try {
      const params = await form.validateFields();
      const isSuccess = await globalServiceThunk.updateProfile(params);
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
      title="个人信息"
      visible={visible}
      onOk={onOk(handleOk)}
      confirmLoading={confirmLoading}
      onCancel={close}
    >
      <Form form={form} {...layout}>
        <Form.Item label="名称" name="nickname" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="手机号" name="phone">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="邮箱" name="email">
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
