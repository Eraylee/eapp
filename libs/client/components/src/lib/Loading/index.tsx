import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./style.less";

export const Loading = () => {
  return (
    <div className="components-loading-root">
      <Spin indicator={<LoadingOutlined spin />} />
    </div>
  );
};
