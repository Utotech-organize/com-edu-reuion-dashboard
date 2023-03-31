import { Button, Form, Input, Row, Typography } from "antd";
import * as Icon from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import * as API from "../api";

export async function action({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  // try {
  //   const { data } = await API.login(submitData);
  //   const decode = jwtDecode(data.access_token) as any;

  //   if (decode.id == 1) {
  //     localStorage.setItem("token", data.access_token);
  //     return redirect("/dashboard/analytics");
  //   } else {
  //     localStorage.setItem("token", data.access_token);
  //     return redirect("/home");
  //   }
  // } catch (e: any) {
  //   return { error: e.response.data.message };
  // }
}

export const Login = () => {
  const navigate = useNavigate();

  const hanleSubmit = async (values: any) => {
    console.log({ values });

    // console.log("test fuck");

    // localStorage.setItem("token", JSON.stringify("123"));

    // navigate("/dashboard");

    try {
      const res = await API.login(values);

      console.log({ res });
    } catch (e: any) {
      console.log({ e });
    }
  };

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
                {/* <Link to="/dashboard"> */}
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                {/* </Link> */}
              </Form.Item>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};
