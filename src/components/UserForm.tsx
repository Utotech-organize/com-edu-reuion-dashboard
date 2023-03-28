import { Button, Form, Input, Row, Select, Space, Typography } from "antd";
import React from "react";

interface UserFormProps {
  title: string;
  form: any;
  footer: any;
  onFinished: (values: any) => void;
}

export const UserForm: React.FC<UserFormProps> = (props: UserFormProps) => {
  const { title, form, footer, onFinished } = props;
  const { Option } = Select;

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
    >
      <Typography.Title level={4} style={{ marginTop: "0px" }}>
        {title}
      </Typography.Title>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your Email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your Name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Please input your Phone!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Working Address"
        name="address"
        rules={[
          { required: true, message: "Please input your Working Address!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="role"
        label="Access Role"
        rules={[{ required: true, message: "Please select Access Role!" }]}
      >
        <Select placeholder="Select accessible role.">
          <Option value="admin">Admin</Option>
          <Option value="Staff">staff</Option>
          <Option value="user">User</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Line id" name="lineId">
        <Input />
      </Form.Item>

      <Form.Item label="Line name" name="LineName">
        <Input />
      </Form.Item>

      {footer}
    </Form>
  );
};
