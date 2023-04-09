import { Button, Col, Form, Input, Row, Select, Space, Typography } from "antd";
import React from "react";

interface CustomerFormProps {
  edit?: boolean;
  title: string;
  form: any;
  footer: any;
  onFinished: (values: any) => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = (
  props: CustomerFormProps
) => {
  const { title, form, footer, onFinished } = props;

  return (
    <Form
      form={form}
      name="customer"
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

      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item
            label="First Name"
            name="first_name"
            labelCol={{ span: 6 }}
            rules={[
              { required: true, message: "Please input your First Name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item
            label="Last Name"
            name="last_name"
            labelCol={{ span: 6 }}
            rules={[
              { required: true, message: "Please input your Last Name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label="Phone"
        name="tel"
        rules={[{ required: true, message: "Please input your Phone!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Working Address"
        name="information"
        rules={[
          { required: true, message: "Please input your Working Address!" },
        ]}
      >
        <Input />
      </Form.Item>

      {footer}
    </Form>
  );
};
