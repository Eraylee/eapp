import React from "react";

export interface EmptyViewProps {
  size: number;
}

const EmptyView = ({ size }: EmptyViewProps) => {
  return <div style={{ height: size }} />;
};
EmptyView.defaultProps = {
  size: 16,
};
export { EmptyView };
