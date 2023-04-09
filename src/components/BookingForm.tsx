import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space, Upload } from "antd";
import React from "react";

interface BookingFormProps {
  desk?: any;
  selectedSeat?: any[];
  imageUrl?: any[];
  handleBooking?: (mode: string) => void;
  handleChange?: (image: any) => void;
}

export const BookingForm: React.FC<BookingFormProps> = (
  props: BookingFormProps
) => {
  const { desk, selectedSeat, imageUrl, handleBooking, handleChange } = props;

  return (
    <React.Fragment>
      <Row gutter={20}>
        <Col xs={24} sm={24} md={24} lg={12}>
          <Form.Item label="First Name" name="first_name">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12}>
          <Form.Item label="Last Name" name="last_name">
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Phone" name="tel">
        <Input disabled />
      </Form.Item>

      <Form.Item label="Working Address" name="information">
        <Input.TextArea rows={3} disabled />
      </Form.Item>

      <Form.Item label="Email" name="email">
        <Input disabled />
      </Form.Item>

      <Row
        justify="center"
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      >
        <Col span={12}>
          <Col style={{ textAlign: "center" }}>
            <Form.Item
              labelCol={{ span: 4 }}
              style={{
                textAlign: "center",
              }}
            >
              <Upload
                // multiple={true}
                // onPreview={handlePreview}
                listType="picture-card"
                accept="image/*"
                beforeUpload={(file) => {
                  return false;
                }}
                onChange={handleChange}
                style={{
                  width: 140,
                  height: 200,
                }}
              >
                {!imageUrl?.length ? (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                ) : null}
              </Upload>
            </Form.Item>
          </Col>
        </Col>

        <Col
          span={12}
          style={{
            marginTop: 15,
          }}
        >
          <Space
            direction="vertical"
            size="small"
            style={{
              width: "100%",
            }}
          >
            <Button
              htmlType="submit"
              onClick={() => handleBooking?.("some")}
              disabled={selectedSeat?.length === 0 || !imageUrl?.length}
              block
              style={{
                background: "#303E57",
                color: "#ffffff",
              }}
            >
              Reserve
            </Button>

            <Button
              htmlType="submit"
              onClick={() => handleBooking?.("all")}
              disabled={
                (desk && desk.status === "pending") ||
                (desk && desk.status === "unavailable")
              }
              block
              style={{
                background: "#FFA800",
                color: "#ffffff",
              }}
            >
              Reserve All
            </Button>
          </Space>
        </Col>
      </Row>
    </React.Fragment>
  );
};
