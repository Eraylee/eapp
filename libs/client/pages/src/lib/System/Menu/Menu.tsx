/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, ReactText } from 'react';
import { Card, Button, Space, Table, Tag } from 'antd';
// import { useDispatch, useSelector } from "react-redux";
// import { getMenuTreeData, remove } from "./store";
import { Menu } from '@eapp/client/api';
import { MenuDetail } from './Detail';
import { OperateType } from '@eapp/types';
import { useModal } from '@eapp/client/hooks';
import { DeletePopconfirm, EmptyView } from '@eapp/client/components';
import {
  // globalServiceActions,
  menuServiceActions,
  menuServiceThunk,
  useRootDispatch,
  useRootSelector,
} from '@eapp/client/service';
import { ColumnsType } from "antd/lib/table";

const menuTypes: { [key: string]: string } = {
  '1': '布局',
  '2': '接口',
  '3': '路由',
};

const getColumns = (
  onEdit = (id: number) => {},
  onRomve = (id: number) => {}
): ColumnsType<Menu> => {
  return [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '动作',
      dataIndex: 'action',
    },
    {
      title: '地址',
      dataIndex: 'path',
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: (value: string) => <Tag color="blue">{menuTypes[value]}</Tag>,
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

export default () => {
  const { visible, confirmLoading, open, ok, close, operateType } = useModal();
  const [currentId, setCurrentId] = useState(0);
  // const [operateType, setOperateType] = useState(OperateType.Create);
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  const dispatch = useRootDispatch();
  const { menus } = useRootSelector((state) => state.menuReducer);
  useEffect(() => {
    dispatch(menuServiceThunk.getMenuTreeData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onChange = (keys: ReactText[]) => {
    setSelectedRowKeys(keys);
  };
  const handleRmoveBatch = () => {
    dispatch(menuServiceThunk.remove(selectedRowKeys));
  };
  const handleRemove = (id: number) => {
    dispatch(menuServiceThunk.remove([id]));
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
      <Table<Menu>
        rowKey="id"
        columns={getColumns(handleEdit, handleRemove)}
        rowSelection={{ onChange }}
        dataSource={menus as Menu[]}
      />
      <MenuDetail
        visible={visible}
        operateType={operateType}
        confirmLoading={confirmLoading}
        onClose={close}
        id={currentId}
        onOk={ok}
      />
    </Card>
  );
};
