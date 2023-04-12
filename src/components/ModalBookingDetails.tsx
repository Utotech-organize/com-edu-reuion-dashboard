import { Button, Divider, Form, Input, Modal } from "antd";
import React from "react";

interface ModalBookingDetailsProps {
  open: boolean;
  onCancel: () => void;
  handleFinishedModal: () => void;
}

export const ModalBookingDetails: React.FC<ModalBookingDetailsProps> = (
  props: ModalBookingDetailsProps
) => {
  const { open, onCancel, handleFinishedModal } = props;
  return (
    <Modal
      title="Booking Details"
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleFinishedModal}>
          Submit
        </Button>,
      ]}
    >
      <Divider />
      <Form.Item label="Chair No." name="no" labelCol={{ span: 4 }}>
        <Input disabled />
      </Form.Item>

      <Form.Item label="Amount" name="amount" labelCol={{ span: 4 }}>
        <Input disabled />
      </Form.Item>

      <Form.Item label="Price / Chair" name="unitprice" labelCol={{ span: 4 }}>
        <Input disabled />
      </Form.Item>

      <Form.Item label="Total" name="total" labelCol={{ span: 4 }}>
        <Input disabled />
      </Form.Item>
    </Modal>
  );
};
