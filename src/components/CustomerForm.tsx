import { Button, Col, Form, Input, Row, Select, Space, Typography } from "antd";
import React from "react";
import { UploadImage } from "./UploadImage";

interface CustomerFormProps {
  data?: any;
  edit?: boolean;
  title: string;
  form: any;
  footer: any;
  onFinished: (values: any) => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = (
  props: CustomerFormProps
) => {
  const { data, title, form, footer, onFinished } = props;

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
      initialValues={{ ...data }}
    >
      <Typography.Title level={4} style={{ marginTop: "0px" }}>
        {title}
      </Typography.Title>

      <Row
        justify="center"
        style={{ width: "100%", height: 150, pointerEvents: "none" }}
      >
        <UploadImage
          data={
            data && data.line_photo_url
              ? [{ uid: "-1", url: data.line_photo_url }]
              : []
          }
          type="picture-circle"
          loading={false}
          handleLoader={() => {}}
        />
      </Row>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your Email!" }]}
      >
        <Input />
      </Form.Item>

      <Row gutter={20}>
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
        label="Generation"
        name="generation"
        rules={[{ message: "Please input your Generation!" }]}
      >
        <Input placeholder="TCT,CED" />
      </Form.Item>

      <Form.Item
        label="Working Address"
        name="information"
        rules={[{ message: "Please input your Working Address!" }]}
      >
        <Input.TextArea cols={4} />
      </Form.Item>

      <Row gutter={20}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item
            label="Line LIFF ID"
            name="line_liff_id"
            labelCol={{ span: 6 }}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item
            label="Line Name"
            name="line_display_name"
            labelCol={{ span: 6 }}
          >
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Update At" name="updated_at">
        <Input.TextArea cols={4} disabled />
      </Form.Item>

      {footer}
    </Form>
  );
};
