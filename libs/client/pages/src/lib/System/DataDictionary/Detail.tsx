import React, { useEffect } from 'react';

import { Form, Input, Modal, InputNumber } from 'antd';
import { OperateType } from '@eapp/types';
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getFormValue,
//   setFormValue,
//   createOrUpdate,
//   clearFormValue,
//   getDataDictionaryTree,
// } from "./store";
import {
  // globalServiceActions,
  // menuServiceActions,
  dataDictionaryServiceActions,
  dataDictionaryServiceThunks,
  useRootDispatch,
  useRootSelector,
} from '@eapp/client/service';
import { ModalOk } from '@eapp/client/hooks';
import { ERadio, ETreeSelect } from '@eapp/client/components';

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

export const DataDictionaryDetail: React.FC<DetailProps> = ({
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
  const { formValue, treeData } = useRootSelector(
    (state) => state.dataDictionaryReducer
  );

  useEffect(() => {
    if (visible && operateType !== OperateType.Create && id) {
      dispatch(dataDictionaryServiceThunks.getFormValue(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, operateType, visible]);

  useEffect(() => {
    form.setFieldsValue(formValue);
    dispatch(dataDictionaryServiceActions.setFormValue(formValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue]);

  const handleOk = async () => {
    try {
      const params = await form.validateFields();
      const isSuccess = await dataDictionaryServiceThunks.createOrUpdate(
        params,
        id
      );
      if (isSuccess) {
        form.resetFields();
        dispatch(dataDictionaryServiceActions.clearFormValue());
        dispatch(dataDictionaryServiceThunks.getDataDictionaryTree());
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
    dispatch(dataDictionaryServiceActions.clearFormValue());
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
        <Form.Item
          label="????????????"
          name="dictionaryName"
          rules={[{ required: true }]}
        >
          <Input placeholder="?????????" />
        </Form.Item>
        <Form.Item
          label="????????????"
          name="dictionaryCode"
          rules={[{ required: true }]}
        >
          <Input placeholder="?????????" />
        </Form.Item>
        <Form.Item
          label="?????????"
          name="dictionaryValue"
          rules={[{ required: true }]}
        >
          <Input placeholder="?????????" />
        </Form.Item>
        <Form.Item label="??????" name="description">
          <Input placeholder="?????????" />
        </Form.Item>
        <Form.Item label="????????????" name={['parent', 'id']}>
          <ETreeSelect placeholder="?????????" dataSource={treeData} />
        </Form.Item>
        <Form.Item label="??????" name="sort">
          <InputNumber placeholder="?????????" />
        </Form.Item>
        <Form.Item label="????????????" name="visiable">
          <ERadio
            dataSource={[
              {
                label: '??????',
                value: 1,
              },
              {
                label: '??????',
                value: 2,
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
DataDictionaryDetail.defaultProps = {
  confirmLoading: false,
  visible: false,
  operateType: OperateType.Create,
} as DetailProps;
