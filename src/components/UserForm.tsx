import { Col, Form, Input, Row, Typography } from "antd";
import React from "react";
import { UploadImage } from "./UploadImage";

interface UserFormProps {
  data?: any;
  loading: boolean;
  edit?: boolean;
  title: string;
  form: any;
  footer: any;
  handleLoader: (status: boolean) => void;
  onFinished: (values: any) => void;
}

export const UserForm: React.FC<UserFormProps> = (props: UserFormProps) => {
  const { data, loading, edit, title, form, footer, handleLoader, onFinished } =
    props;

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
      initialValues={{
        ...data,
        fileList:
          data && data.image_url ? [{ uid: "-1", url: data.image_url }] : [],
      }}
    >
      <Typography.Title level={4} style={{ marginTop: "0px" }}>
        {title}
      </Typography.Title>
      <Row justify="center" style={{ width: "100%", height: 150 }}>
        <UploadImage
          data={
            data && data.image_url ? [{ uid: "-1", url: data.image_url }] : []
          }
          type="picture-circle"
          loading={loading}
          handleLoader={handleLoader}
        />
      </Row>
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

      {footer}
    </Form>
  );
};
