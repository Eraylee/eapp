import React, { useEffect, useState, ReactText } from 'react';

import {
  Form,
  Input,
  Modal,
  InputNumber,
  Tree,
  Divider,
  Typography,
} from 'antd';
import { produce } from 'immer';
// import {
//   getFormValue,
//   setFormValue,
//   createOrUpdate,
//   clearFormValue,
// } from "../../../../../service/src/lib/role.service";
import { ModalOk } from '@eapp/client/hooks';
import { ERadio, EmptyView } from '@eapp/client/components';
import { Role } from '@eapp/client/api';
import { statusDataSource } from '@eapp/client/common';
import {
  // globalServiceActions,
  menuServiceActions,
  roleServiceActions,
  roleServiceThunk,
  useRootDispatch,
  useRootSelector,
} from '@eapp/client/service';
import { OperateType } from '@eapp/types';

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

type Checked =
  | {
      checked: ReactText[];
      halfChecked: ReactText[];
    }
  | ReactText[];

export const Detail: React.FC<DetailProps> = ({
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
  const { formValue, treeData } = useRootSelector((state) => state.roleReducer);

  const [checkedKeys, setCheckedKeys] = useState<ReactText[]>([]);

  const onCheck = (checkedKeys: Checked) => {
    if (Array.isArray(checkedKeys)) {
      setCheckedKeys(checkedKeys);
      return;
    }
    setCheckedKeys(checkedKeys.checked);
  };

  useEffect(() => {
    if (visible && operateType !== OperateType.Create && id) {
      dispatch(roleServiceThunk.getFormValue(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, operateType, visible]);

  useEffect(() => {
    dispatch(roleServiceThunk.getMenuTree());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    form.setFieldsValue(formValue);
    if (formValue.menuIds) {
      setCheckedKeys(formValue.menuIds);
    }
    dispatch(roleServiceActions.setFormValue(formValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue]);

  const handleOk = async () => {
    try {
      const formValue: Role = await form.validateFields();
      const params = produce(formValue, (data: Role) => {
        data.menuIds = checkedKeys as number[];
      });
      const isSuccess = await roleServiceThunk.createOrUpdate(params, id);
      if (isSuccess) {
        form.resetFields();
        dispatch(roleServiceActions.clearFormValue());
        setCheckedKeys([]);
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
    dispatch(roleServiceActions.clearFormValue());
    setCheckedKeys([]);
    onClose();
  };
  return (
    <Modal
      getContainer={false}
      title="????????????"
      visible={visible}
      onOk={onOk(handleOk)}
      confirmLoading={confirmLoading}
      onCancel={close}
    >
      <Form form={form} {...layout}>
        <Form.Item label="??????" name="name" rules={[{ required: true }]}>
          <Input placeholder="?????????" />
        </Form.Item>
        <Form.Item label="??????" name="code" rules={[{ required: true }]}>
          <Input placeholder="?????????" />
        </Form.Item>

        <Form.Item label="??????" name="sort">
          <InputNumber placeholder="?????????" />
        </Form.Item>
        <Form.Item label="????????????" name="status">
          <ERadio dataSource={statusDataSource} />
        </Form.Item>
        <Divider />
        <Typography.Text strong>????????????</Typography.Text>
        <EmptyView size={12} />
        <Tree
          checkable
          checkStrictly
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          treeData={treeData}
        />
      </Form>
    </Modal>
  );
};
Detail.defaultProps = {
  confirmLoading: false,
  visible: false,
  operateType: OperateType.Create,
} as DetailProps;
