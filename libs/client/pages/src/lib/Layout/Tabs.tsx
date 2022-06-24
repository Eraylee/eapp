import React, { useEffect } from 'react';
import { Tabs, Menu, Dropdown, Button } from 'antd';
// import {
//   removeTab,
//   removeRightTabs,
//   removeAllTabs,
//   removeOtherTabs,
//   setActiveKey,
//   TabItem,
// } from "../../../../service/src/lib/global.service";
import {
  useRootDispatch,
  useRootSelector,
  globalServiceActions,
  TabItem,
} from '@eapp/client/service';

import { useNavigate } from 'react-router-dom';
const { TabPane } = Tabs;

export default () => {
  const dispatch = useRootDispatch();
  const nav = useNavigate();
  const { tabs, activeKey } = useRootSelector((state) => state.globalReducer);
  //刷新之后调转到首页
  useEffect(() => {
    nav('/dashboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (key: any, action: 'add' | 'remove') => {
    if (action === 'remove') {
      dispatch(globalServiceActions.removeTab(key));
    }
  };
  /**
   * 删除当前标签
   */
  const handleRemove = (key: string) => () => {
    dispatch(globalServiceActions.removeTab(key));
  };
  /**
   * 删除右侧标签
   */
  const handleRemoveRight = (key: string) => () => {
    dispatch(globalServiceActions.removeRightTabs(key));
  };
  /**
   * 删除其他标签
   */
  const handleRemoveOther = (key: string) => () => {
    dispatch(globalServiceActions.removeOtherTabs(key));
  };
  /**
   * 删除全部标签
   */
  const handleRemoveAll = () => {
    dispatch(globalServiceActions.removeAllTabs());
  };

  const getIsRemoveCurrentDisabled = (index: number) => index === 0;

  const getIsRemoveRightDisabled = (index: number, length: number) =>
    index === length - 1;

  const getMenuItems = (tab: TabItem, index: number) => (
    <Menu>
      <Menu.Item
        onClick={handleRemove(tab.key)}
        disabled={getIsRemoveCurrentDisabled(index)}
      >
        <div>关闭当前标签页</div>
      </Menu.Item>
      <Menu.Item
        onClick={handleRemoveRight(tab.key)}
        disabled={getIsRemoveRightDisabled(index, tabs.length)}
      >
        <div>关闭右侧标签页</div>
      </Menu.Item>
      <Menu.Item onClick={handleRemoveOther(tab.key)}>
        <div>关闭其他标签页</div>
      </Menu.Item>
      <Menu.Item onClick={handleRemoveAll}>
        <div>关闭全部标签页</div>
      </Menu.Item>
      <Menu.Item>
        <div>刷新当前标签页</div>
      </Menu.Item>
    </Menu>
  );

  const handleClick = (key: string) => {
    const currentTab = tabs.find((v) => v.key === key);
    if (currentTab) {
      nav(currentTab.path);
      document.title = currentTab.title;
    }
    dispatch(globalServiceActions.setActiveKey(key));
  };

  return (
    <Tabs
      hideAdd
      className="layout-tabs-root"
      size="small"
      onEdit={handleEdit}
      type="editable-card"
      onTabClick={handleClick}
      activeKey={activeKey}
    >
      {tabs.map((v, k) => (
        <TabPane
          tab={
            <Dropdown overlay={getMenuItems(v, k)} trigger={['contextMenu']}>
              <Button type="text">{v.title}</Button>
            </Dropdown>
          }
          key={v.key}
          closable={k !== 0}
        />
      ))}
    </Tabs>
  );
};
