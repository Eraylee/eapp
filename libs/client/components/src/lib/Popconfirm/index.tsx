/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Popconfirm } from "antd";

export interface DeletePopconfirmProps {
  onClick: (e?: React.MouseEvent<HTMLElement>) => void;
}

export const DeletePopconfirm: React.FC<DeletePopconfirmProps> = ({
  onClick,
}) => {
  return (
    <Popconfirm
      title="确定删除?"
      onConfirm={onClick}
      okText="是"
      cancelText="否"
    >
      <a>删除</a>
    </Popconfirm>
  );
};
