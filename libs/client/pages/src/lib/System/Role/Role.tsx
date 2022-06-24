/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactText, useState } from 'react';
import { Card, Form, Button, Input, Space, Table } from 'antd';
import { apiSystemRoleQueryPage, Role } from '@eapp/client/api';
import { useAntdTable } from 'ahooks';
import { Detail } from './Detail';
import { Params } from 'ahooks/lib/useAntdTable/types';
import { ColumnsType } from 'antd/lib/table';
import { useModal } from '@eapp/client/hooks';
// import { remove } from "../../../../../service/src/lib/role.service";
import { OperateType } from '@eapp/types';
import {
  DeletePopconfirm,
  AdvancedSearch,
  EmptyView,
} from '@eapp/client/components';
import {
  // globalServiceActions,
  menuServiceActions,
  roleServiceActions,
  roleServiceThunk,
  useRootDispatch,
  useRootSelector,
} from '@eapp/client/service';
const getColumns = (
  onEdit = (id: number) => {},
  onRomve = (id: number) => {}
): ColumnsType<Role> => {
  return [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '编码',
      dataIndex: 'code',
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
  formData: Partial<Role>
) => {
  const params = { ...formData, pageNum: current, pageSize };
  const res = await apiSystemRoleQueryPage(params);
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
  const handleRmoveBatch = () => {
    roleServiceThunk.remove(selectedRowKeys);
    submit();
  };
  const handleRemove = async (id: number) => {
    await roleServiceThunk.remove([id]);
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
  const isDisabled = selectedRowKeys.length === 0;

  return (
    <>
      <Card bordered={false}>
        <Form form={form}>
          <AdvancedSearch onReset={reset} onSubmit={submit}>
            <Form.Item name="name" label="名称">
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item name="code" label="编码">
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
          <Button onClick={handleRmoveBatch} disabled={isDisabled}>
            删除
          </Button>
        </Space>
        <EmptyView />
        <Table<Role>
          rowKey="id"
          columns={getColumns(handleEdit, handleRemove)}
          rowSelection={{ onChange }}
          {...tableProps}
        />
      </Card>

      <Detail
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
