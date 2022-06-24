/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactText, useState } from 'react';
import { Card, Form, Button, Input, Space, Table } from 'antd';
import { apiSystemUserQueryPage, User } from '@eapp/client/api';
import { useAntdTable } from 'ahooks';
import { UserDetail } from './Detail';
import { Params } from 'ahooks/lib/useAntdTable/types';
import { ColumnsType } from 'antd/lib/table';
import { useModal } from '@eapp/client/hooks';
// import {
//   remove,
//   resetPassword,
// } from '../../../../../service/src/lib/user.service';
import { OperateType } from '@eapp/types';
import {
  DeletePopconfirm,
  EmptyView,
  AdvancedSearch,
} from '@eapp/client/components';
import { userServiceThunk } from '@eapp/client/service';

const getColumns = (
  onEdit = (id: number) => {},
  onRomve = (id: number) => {}
): ColumnsType<User> => {
  return [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户编号',
      dataIndex: 'userNo',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '操作',
      dataIndex: 'tableAction',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => onEdit(record.id)}>修改</a>
          <DeletePopconfirm onClick={() => onRomve(record.id)} />
        </Space>
      ),
    },
  ];
};

const getTableData = async (
  { current, pageSize }: Params[0],
  formData: Partial<User>
) => {
  const params = { ...formData, pageNum: current, pageSize };
  const res = await apiSystemUserQueryPage(params);
  return {
    total: res.total,
    list: res.data,
  };
};

export default () => {
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableData, {
    form,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  const [currentId, setCurrentId] = useState(0);
  const { visible, confirmLoading, open, ok, close, operateType } = useModal();
  const { submit, reset } = search;
  const onChange = (keys: ReactText[]) => {
    setSelectedRowKeys(keys);
  };
  const handleRmoveBatch = async () => {
    await userServiceThunk.remove(selectedRowKeys);
    submit();
  };
  const handleRemove = async (id: number) => {
    await userServiceThunk.remove([id]);
    submit();
  };
  const handleResetPassword = async () => {
    await userServiceThunk.resetPassword(selectedRowKeys[0]);
    submit();
  };
  const handleCreate = () => {
    setCurrentId(0);
    open(OperateType.Create);
  };
  const handleEdit = (id: number) => {
    setCurrentId(id);
    open(OperateType.Edit);
  };
  // 删除按钮置灰
  const isDeleteBatchButtonDisabled = selectedRowKeys.length === 0;
  // 重置密码按钮置灰
  const isResetPasswordButtonDisabled = selectedRowKeys.length !== 1;

  return (
    <>
      <Card bordered={false}>
        <Form form={form}>
          <AdvancedSearch onReset={reset} onSubmit={submit}>
            <Form.Item name="username" label="用户名">
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item name="nickname" label="昵称">
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item name="phone" label="手机号">
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item name="email" label="邮箱">
              <Input placeholder="请输入" />
            </Form.Item>
          </AdvancedSearch>
        </Form>
      </Card>
      <EmptyView />
      <Card bordered={false}>
        <Space>
          <Button type="primary" onClick={handleCreate}>
            新建
          </Button>
          <Button
            onClick={handleResetPassword}
            disabled={isResetPasswordButtonDisabled}
          >
            重置密码
          </Button>
          <Button
            onClick={handleRmoveBatch}
            disabled={isDeleteBatchButtonDisabled}
          >
            删除
          </Button>
        </Space>
        <EmptyView />
        <Table<User>
          rowKey="id"
          columns={getColumns(handleEdit, handleRemove)}
          rowSelection={{ onChange }}
          {...tableProps}
        />
      </Card>

      <UserDetail
        visible={visible}
        onRefresh={submit}
        operateType={operateType}
        confirmLoading={confirmLoading}
        onClose={close}
        id={currentId}
        onOk={ok}
      />
    </>
  );
};
