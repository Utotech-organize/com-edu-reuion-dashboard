import { Button, Divider, Form, Input, InputNumber, Modal, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

interface UpdateProductProps {
  data: any;
  loading?: boolean;
  open: boolean;
  onCancel: () => void;
  handleFinishedModal: (values: any) => void;
}

export const UpdateProduct: React.FC<UpdateProductProps> = (
  props: UpdateProductProps
) => {
  const { data, loading, open, onCancel, handleFinishedModal } = props;
  const [form] = Form.useForm();
  const onFinished = (values: any) => {
    handleFinishedModal(values);
  };

  return (
    <Modal
      title={data.id ? "Update Product" : "Create Product"}
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          loading={loading}
          key="submit"
          type="primary"
          onClick={() => form.submit()}
        >
          Submit
        </Button>,
      ]}
    >
      <Divider />

      <Form
        form={form}
        onFinish={onFinished}
        name="desk"
        autoComplete="off"
        colon={false}
        initialValues={{ data }}
        disabled={loading}
      >
        <Form.Item
          label="Label"
          name="label"
          labelCol={{ span: 6 }}
          rules={[{ required: true, message: "Please input Label!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          labelCol={{ span: 6 }}
          rules={[{ required: true, message: "Please input Price!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Ordering" name="ordering" labelCol={{ span: 6 }}>
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Remark" name="remark" labelCol={{ span: 6 }}>
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 6 }}
          label="Active"
          name="active"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};
