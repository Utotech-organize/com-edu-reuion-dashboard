import { Button, Form, Input, Row, Typography } from "antd";
import * as Icon from "@ant-design/icons";
import { Link } from "react-router-dom";
export const Login = () => {
  const hanleSubmit = () => {};

  return (
    <div className="login-layout">
      <div className="login-layout-inner">
        <Row justify="center">
          <Typography.Title level={2}>
            <span className="logo-text-color1">ComEdu</span>{" "}
            <span className="logo-text-color2">Reuion</span>
          </Typography.Title>
        </Row>
        <div className="login-form">
          <Typography.Text
            style={{
              marginBottom: "20px",
              color: "#ffffff",
            }}
          >
            Login
          </Typography.Text>
          <Form
            name="basic"
            onFinish={hanleSubmit}
            autoComplete="off"
            colon={false}
            requiredMark={false}
            style={{ marginTop: "30px" }}
          >
            <Form.Item
              label={<Icon.UserOutlined />}
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={<Icon.KeyOutlined />}
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Row justify="center">
              <Form.Item
                style={{
                  marginTop: "24px",
                }}
              >
                <Link to="/dashboard">
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Link>
              </Form.Item>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};
