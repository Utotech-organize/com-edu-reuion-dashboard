import { Space, Typography } from "antd";
import React from "react";

interface HeaderBarProps {
  title: string;
  btnData: any[];
}

export const HeaderBar: React.FC<HeaderBarProps> = (props: HeaderBarProps) => {
  const { title, btnData } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "10px",
      }}
    >
      <Typography.Title level={3} style={{ marginTop: "10px" }}>
        {title}
      </Typography.Title>

      <Space>{...btnData}</Space>
    </div>
  );
};
