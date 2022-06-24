/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactText, useState, useEffect } from 'react';
import { Card, Form, Button, Input, Space, Tree, Row, Col, Table } from 'antd';
import {
  EmptyView,
  AdvancedSearch,
  DeletePopconfirm,
} from '@eapp/client/components';
import {
  apiSystemDataDictionaryQueryPage,
  DataDictionary,
} from '@eapp/client/api';
import { useAntdTable } from 'ahooks';
import { DataDictionaryDetail } from './Detail';
import { Params } from 'ahooks/lib/useAntdTable/types';
import { ColumnsType } from 'antd/lib/table';
import { useModal } from '@eapp/client/hooks';
import { OperateType } from '@eapp/types';
import {
  // globalServiceActions,
  ThemeName,
  globalServiceThunk,
  useRootDispatch,
  useRootSelector,
  dataDictionaryServiceThunks,
} from '@eapp/client/service';

const getColumns = (
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onEdit = (id: number) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onRomve = (id: number) => {}
): ColumnsType<DataDictionary> => {
  return [
    {
      title: '字典名称',
      dataIndex: 'dictionaryName',
    },
    {
      title: '字典编码',
      dataIndex: 'dictionaryCode',
    },
    {
      title: '字典选中值',
      dataIndex: 'dictionaryValue',
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

// type Checked =
//   | {
//       checked: ReactText[];
//       halfChecked: ReactText[];
//     }
//   | ReactText[];

const getTableData = async (
  { current, pageSize }: Params[0],
  formData: Partial<DataDictionary>
) => {
  console.log('formData', formData);
  const params = { ...formData, pageNum: current, pageSize };
  const res = await apiSystemDataDictionaryQueryPage(params);
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
  const [selectedKeys, setSelectedKeys] = useState<ReactText[]>([]);
  const { visible, confirmLoading, open, ok, close, operateType } = useModal();
  const dispatch = useRootDispatch();
  const { treeData } = useRootSelector((state) => state.dataDictionaryReducer);
  const { submit, reset } = search;
  const onChange = (keys: ReactText[]) => {
    setSelectedRowKeys(keys);
  };
  useEffect(() => {
    dispatch(dataDictionaryServiceThunks.getDataDictionaryTree());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleRmoveBatch = () => {
    dataDictionaryServiceThunks.remove(selectedRowKeys);
    dispatch(dataDictionaryServiceThunks.getDataDictionaryTree());
    submit();
  };
  const handleSelectTree = (selectedKeys: ReactText[]) => {
    form.setFieldsValue({ parentId: selectedKeys[0] });
    setSelectedKeys(selectedKeys);
    submit();
  };
  const handleRemove = async (id: number) => {
    await dataDictionaryServiceThunks.remove([id]);
    dispatch(dataDictionaryServiceThunks.getDataDictionaryTree());
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
      <Row gutter={16}>
        <Col span={4}>
          <Card style={{ height: '100%' }} bordered={false}>
            <Tree
              treeData={treeData}
              onSelect={handleSelectTree}
              selectedKeys={selectedKeys}
            />
          </Card>
        </Col>
        <Col span={20}>
          <Card bordered={false}>
            <Form form={form}>
              <Form.Item name="parentId" hidden>
                <Input />
              </Form.Item>
              <AdvancedSearch onReset={reset} onSubmit={submit}>
                <Form.Item name="dictionaryName" label="字典名称">
                  <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item name="dictionaryCode" label="字典编码">
                  <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item name="dictionaryValue" label="字典值">
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
            <Table<DataDictionary>
              rowKey="id"
              columns={getColumns(handleEdit, handleRemove)}
              rowSelection={{ onChange }}
              {...tableProps}
            />
          </Card>
        </Col>
      </Row>

      <DataDictionaryDetail
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
