import { Space, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import * as Icon from "@ant-design/icons";

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
      <Space>
        <Typography.Title level={3} style={{ marginTop: "10px" }}>
          {title}
        </Typography.Title>
      </Space>

      <Space>{...btnData}</Space>
    </div>
  );
};
