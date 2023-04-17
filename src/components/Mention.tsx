import { CopyOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Typography,
  notification,
} from "antd";
import React from "react";

interface MentionProps {
  selectedSeat?: any[];
  notShow?: boolean;
}

export const Mention: React.FC<MentionProps> = (props: MentionProps) => {
  const { notShow, selectedSeat } = props;
  const mentions = [
    {
      text: "Seat is available.",
      color: "#FFA800",
    },
    {
      text: "Your selected seat",
      color: "#00B1B1",
    },
    {
      text: "Seat is on pending",
      color: "#9CB0D7",
    },
    {
      text: "Seat is not available.",
      color: "rgba(255, 202, 24, 0.4)",
    },
  ];

  return (
    <Row gutter={5}>
      <Col xs={24} sm={24} md={24} lg={9}>
        <Typography.Text
          style={{
            padding: "8px",
          }}
        >
          Mention
        </Typography.Text>
        <br />
        {mentions.map((d: any) => (
          <Space
            key={d.text}
            direction="horizontal"
            style={{ marginTop: "12px" }}
          >
            <div
              className="mention"
              style={{
                background: d.color,
                textAlign: "center",
                cursor: "default",
              }}
            >
              Table
              <br />
              Ax
            </div>
            {d.text}
          </Space>
        ))}
      </Col>

      {!notShow && (
        <Col xs={24} sm={24} md={24} lg={15}>
          {selectedSeat?.length ? (
            <Card title="Summary Booking">
              <Form.Item
                label="Price / Chair"
                name="unitprice"
                labelAlign="left"
                labelCol={{ span: 8 }}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Chair No."
                name="no"
                labelAlign="left"
                labelCol={{ span: 8 }}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Amount"
                name="amount"
                labelAlign="left"
                labelCol={{ span: 8 }}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Total"
                name="total"
                labelAlign="left"
                labelCol={{ span: 8 }}
              >
                <Input disabled />
              </Form.Item>
            </Card>
          ) : null}
        </Col>
      )}
    </Row>
  );
};
