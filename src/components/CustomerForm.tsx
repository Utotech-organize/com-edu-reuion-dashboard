import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import React from "react";
import dayjs from "dayjs";
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
  const { edit, data, title, form, footer, onFinished } = props;

  return (
    <Form
      form={form}
      name="customer"
      onFinish={onFinished}
      autoComplete="off"
      colon={false}
      layout="horizontal"
      labelCol={{ xs: 24, sm: 8, md: 6, lg: 3 }}
      labelAlign="left"
      initialValues={
        edit
          ? {
              ...data,
              updated_at: dayjs(data.updated_at).format("DD/MM/YYYY HH:mm"),
            }
          : {}
      }
    >
      <Typography.Title level={4} style={{ marginTop: "0px" }}>
        {title}
      </Typography.Title>

      <Row justify="center">
        {data && data.line_photo_url && (
          <Avatar
            src={data.line_photo_url}
            style={{
              minHeight: "100px",
              minWidth: "100px",
              marginBottom: "12px",
            }}
          />
        )}
      </Row>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your Email!" }]}
      >
        <Input />
      </Form.Item>

      <Row gutter={20}>
        <Col xs={24} sm={24} md={24} lg={12}>
          <Form.Item
            label="First Name"
            name="first_name"
            labelCol={{ xs: 24, sm: 8, md: 6, lg: 6 }}
            rules={[
              { required: true, message: "Please input your First Name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12}>
          <Form.Item
            label="Last Name"
            name="last_name"
            labelCol={{ xs: 24, sm: 8, md: 6, lg: 6 }}
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
        <Col xs={24} sm={24} md={24} lg={12}>
          <Form.Item
            label="Line LIFF ID"
            name="line_liff_id"
            labelCol={{ xs: 24, sm: 8, md: 6, lg: 6 }}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12}>
          <Form.Item
            label="Line Name"
            name="line_display_name"
            labelCol={{ xs: 24, sm: 8, md: 6, lg: 6 }}
          >
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Updated At" name="updated_at">
        <Input.TextArea cols={4} disabled />
      </Form.Item>

      {footer}
    </Form>
  );
};
