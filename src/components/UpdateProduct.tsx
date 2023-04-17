import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Switch,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { UploadImage } from "./UploadImage";

interface UpdateProductProps {
  form: any;
  data: any;
  loading?: boolean;
  open: boolean;
  onCancel: () => void;
  handleFinishedModal: (values: any) => void;
}

export const UpdateProduct: React.FC<UpdateProductProps> = (
  props: UpdateProductProps
) => {
  const { form, data, loading, open, onCancel, handleFinishedModal } = props;
  const [upload, setUpload] = React.useState(false);

  const onFinished = (values: any) => {
    handleFinishedModal(values);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleLoader = (status: boolean) => {
    setUpload(status);
  };

  return (
    <Modal
      title={data.id ? "Update Product" : "Create Product"}
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="back" htmlType="reset" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          loading={upload}
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
        disabled={upload || loading}
        labelAlign="left"
      >
        <Row justify="center" style={{ width: "100%", height: 120 }}>
          <UploadImage
            data={data.image ? [{ uid: "-1", url: data.image }] : []}
            type="picture-card"
            loading={upload}
            handleLoader={handleLoader}
          />
        </Row>
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
          <InputNumber min={0} style={{ width: "100%" }} />
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
