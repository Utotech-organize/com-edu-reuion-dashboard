import { Form, Input, Typography } from "antd";
import React from "react";

interface UserFormProps {
  loading?: boolean;
  edit?: boolean;
  title: string;
  form: any;
  footer: any;
  onFinished: (values: any) => void;
}

export const UserForm: React.FC<UserFormProps> = (props: UserFormProps) => {
  const { loading, edit, title, form, footer, onFinished } = props;

  return (
    <Form
      form={form}
      name="user"
      onFinish={onFinished}
      autoComplete="off"
      colon={false}
      layout="horizontal"
      labelCol={{ span: 3 }}
      labelAlign="left"
      disabled={loading}
    >
      <Typography.Title level={4} style={{ marginTop: "0px" }}>
        {title}
      </Typography.Title>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your Email!" }]}
      >
        <Input disabled={edit} />
      </Form.Item>

      {!edit && (
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
      )}
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your Name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="tel"
        rules={[{ required: true, message: "Please input your Phone!" }]}
      >
        <Input />
      </Form.Item>

      {footer}
    </Form>
  );
};
