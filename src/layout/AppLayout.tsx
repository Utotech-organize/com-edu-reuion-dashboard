import React from "react";
import { Avatar, Divider, Layout, Menu, Typography } from "antd";
import {
  Link,
  Outlet,
  useLocation,
  useRouteLoaderData,
} from "react-router-dom";
import * as Icon from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";

interface AppLayoutProps {
  children?: any;
}

export const AppLayout: React.FC<AppLayoutProps> = (props: AppLayoutProps) => {
  const { Sider } = Layout;
  const location = useLocation();
  const { me } = useRouteLoaderData("root") as any;

  const [collapsed, setCollapsed] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState("");

  React.useEffect(() => {
    const key = location.pathname.split("/") as any[];
    if (key.length) {
      setActiveKey(key[1]);
    }
  });

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={0}
        style={{
          padding: collapsed ? "0px" : "5px",
        }}
      >
        {!collapsed ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography.Title
              style={{
                fontSize: "15px",
              }}
            >
              <span className="logo-text-color2">ComEduReuion</span>{" "}
              <span className="logo-text-color1">Dashboard</span>
            </Typography.Title>

            <Avatar
              src={me && me.user ? me.user.photo_url : ""}
              style={{ background: "white", marginTop: "20px" }}
            />

            <Typography.Text
              style={{
                color: "white",
              }}
            >
              {me && me.user ? me.user.firstname : ""}{" "}
              {me && me.user ? me.user.lastname : ""}
            </Typography.Text>

            <Divider />
          </div>
        ) : (
          <div style={{ height: "180px" }}></div>
        )}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeKey]}
          items={[
            {
              key: "dashboard",
              icon: <Icon.PieChartOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "user",
              icon: <Icon.UserOutlined />,
              label: <Link to="/user">User Management</Link>,
            },
            {
              key: "reservation",
              icon: <Icon.BookOutlined />,
              label: <Link to="/reservation">Reservation</Link>,
            },
            {
              key: "payment",
              icon: <Icon.DollarOutlined />,
              label: <Link to="/payment">Payment</Link>,
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: "#EDEEF0",
            borderBottom: "2px solid #b4a8a8",
          }}
        >
          <div className="trigger">
            <div
              style={{
                paddingLeft: "20px",
                paddingRight: "20px",
                borderRight: "2px solid #b4a8a8",
                cursor: "pointer",
              }}
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <Icon.MenuUnfoldOutlined />
              ) : (
                <Icon.MenuFoldOutlined />
              )}
            </div>
            <Link to="/login">
              <div
                style={{
                  cursor: "pointer",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                  borderLeft: "2px solid #b4a8a8",
                }}
              >
                Logout
              </div>
            </Link>
          </div>
        </Header>
        <Content
          style={{
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};
