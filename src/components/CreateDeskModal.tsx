import { Button, Divider, Form, Input, InputNumber, Modal, Switch } from "antd";
import React from "react";

interface CreateDeskModalProps {
  open: boolean;
  onCancel: () => void;
  handleFinishedModal: (values: any) => void;
}

export const CreateDeskModal: React.FC<CreateDeskModalProps> = (
  props: CreateDeskModalProps
) => {
  const { open, onCancel, handleFinishedModal } = props;
  const [form] = Form.useForm();
  const onFinished = (values: any) => {
    handleFinishedModal(values);
  };

  return (
    <Modal
      title="Desk Details"
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
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
        initialValues={{ active: true }}
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

        <Form.Item
          label="Price / Chair"
          name="chair_price"
          labelCol={{ span: 6 }}
          rules={[{ required: true, message: "Please input Price / Chair!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
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
