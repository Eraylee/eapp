/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PropsWithChildren, useMemo, useState, memo } from "react";
import _ from "lodash-es";
import { Row, Col, Space, Button } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

export interface AdvancedSearchProps {
  onSubmit: () => void;
  onReset: () => void;
}

export const AdvancedSearch: React.FC<PropsWithChildren<
  AdvancedSearchProps
>> = memo(({ children, onSubmit, onReset }) => {
  const [collapsed, setCollapsed] = useState(false);
  const chunk = useMemo(() => _.chunk(children as React.ReactNodeArray, 4), [
    children,
  ]);
  const handleChangeCollapsed = () => {
    setCollapsed((v) => !v);
  };

  const len = useMemo(() => (Array.isArray(children) ? children.length : 1), [
    children,
  ]);

  const offset = useMemo(() => (len < 3 ? (3 - len) * 6 : 0), [len]);
  const actions = (
    <Space>
      <Button type="primary" onClick={onSubmit}>
        查询
      </Button>
      <Button onClick={onReset}>重置</Button>
      <a onClick={handleChangeCollapsed}>
        {!collapsed ? (
          <>
            <DownOutlined />
            展开
          </>
        ) : (
          <>
            <UpOutlined />
            收起
          </>
        )}
      </a>
    </Space>
  );
  if (!children) {
    return null;
  }
  if (!Array.isArray(children)) {
    return (
      <Row gutter={24}>
        <Col span={6}>{children}</Col>
        <Col span={6} offset={offset} style={{ textAlign: "right" }}>
          {actions}
        </Col>
      </Row>
    );
  }
  if (!collapsed) {
    return (
      <Row gutter={24}>
        {(children as React.ReactNodeArray)
          .filter((v, k) => k < 3)
          .map((v, k) => (
            <Col span={6} key={k}>
              {v}
            </Col>
          ))}
        <Col span={6} offset={offset} style={{ textAlign: "right" }}>
          {actions}
        </Col>
      </Row>
    );
  }
  return (
    <>
      {chunk.map((nodeArray: React.ReactNodeArray, key) => (
        <Row gutter={24} key={key}>
          {nodeArray.map((inputNode, k) => (
            <Col span={6} key={k}>
              {inputNode}
            </Col>
          ))}
        </Row>
      ))}
      <Row gutter={24}>
        <Col offset={18} span={6} style={{ textAlign: "right" }}>
          {actions}
        </Col>
      </Row>
    </>
  );
});
