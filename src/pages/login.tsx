import React from "react";
import { Button, Form, Input, Row, Typography, notification } from "antd";
import * as Icon from "@ant-design/icons";
import { useActionData, useNavigate, useSubmit } from "react-router-dom";

import * as API from "../api";

export async function loader({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);
  try {
    const { data } = await API.login(submitData);
    localStorage.setItem("token", data.access_token);
    return { message: "Welcome to ComEduReuion Dashboard", status: "success" };
  } catch (e: any) {
    return { message: "Invalid email or password", status: "error" };
  }
}

export const Login = () => {
  const submit = useSubmit();
  const navigate = useNavigate();
  const action = useActionData() as any;

  const hanleSubmit = async (values: any) => {
    submit(values, { method: "post" });
  };

  React.useEffect(() => {
    if (action && action.status) {
      const type = action.status as "success" | "error";

      notification[type]({
        message: action.message,
        placement: "bottomLeft",
        duration: 5,
      });

      if (action.status === "success") {
        navigate("/booking");
      }
    }
  }, [action]);

  return (
    <div className="login-layout">
      <div className="login-layout-inner">
        <Row justify="center">
          <Typography.Title level={2}>
            <span className="logo-text-color1">ComEdu</span>{" "}
            <span className="logo-text-color2">Reunion</span>
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
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </div>
        <Row justify="center" style={{ marginTop: "28px" }}>
          <Button
            shape="round"
            size="large"
            style={{ backgroundColor: "#f6b63b", color: "white" }}
            onClick={() => navigate("/scan-code")}
          >
            Scan QR-Code
          </Button>
        </Row>
      </div>
    </div>
  );
};
