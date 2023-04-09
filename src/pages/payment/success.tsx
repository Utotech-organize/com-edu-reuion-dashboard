import React from "react";
import {
  Button,
  Col,
  Row,
  Space,
  Typography,
  Form,
  Input,
  Upload,
  message,
  UploadProps,
  Tag,
} from "antd";
import { Link, useLoaderData } from "react-router-dom";
import { RcFile } from "rc-upload/lib/interface";

import { HeaderBar } from "../../components";
import { IndexPageLayout } from "../../layout";
import * as API from "../../api";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export async function paymentSuccessLoader({ request, params }: any) {
  try {
    const booking = await API.getBooking(params.id);
    const customer = await API.getCustomer(booking.data.data.customer);
    const desk = await API.getDesk(booking.data.data.desk);

    return {
      customer: customer.data.data,
      booking: booking.data.data,
      desk: desk.data.data,
    };
  } catch (e: any) {
    return { customer: null, booking: null, desk: [] };
  }
}

export const PaymentSuccess = () => {
  const { customer, booking, desk } = useLoaderData() as any;

  return (
    <IndexPageLayout>
      <HeaderBar
        title="Payment"
        btnData={[
          <Link to="/payment">
            <Button>Back</Button>
          </Link>,
        ]}
      />
      <div className="reserv-container">
        <div className="reserv-box">
          <Row gutter={20} style={{ minWidth: "95%" }}>
            <Col xs={24} sm={24} md={24} lg={12}>
              <Space size="middle" align="center">
                <Typography.Title
                  level={4}
                  style={{
                    marginTop: "10px",
                    marginBottom: "20px",
                  }}
                >
                  Table {desk && desk.label ? desk.label : "-"}
                </Typography.Title>

                <Space size="small" style={{ marginBottom: "10px" }}>
                  <Tag
                    color={
                      booking.payment_status === "unpaid"
                        ? "warning"
                        : "success"
                    }
                  >
                    {booking.payment_status}
                  </Tag>
                  <Tag
                    color={booking.status === "pending" ? "blue" : "success"}
                  >
                    {booking.status}
                  </Tag>
                </Space>
              </Space>
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  background: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                QR Code
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // paddingLeft: "2rem",
                  // paddingRight: "2rem",
                }}
              >
                <Form
                  // form={form}
                  name="user"
                  // onFinish={onFinished}
                  autoComplete="off"
                  colon={false}
                  layout="vertical"
                  initialValues={{
                    ...customer,
                  }}
                >
                  <Typography.Title
                    level={4}
                    style={{
                      marginTop: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    Booking Detail
                  </Typography.Title>
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

                  <Form.Item label="Table No." name="tableNo">
                    <Input disabled />
                  </Form.Item>
                  <Row gutter={20}>
                    <Col span={12}>
                      <Form.Item label="Amount" name="amount">
                        <Input disabled />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Total" name="total">
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </IndexPageLayout>
  );
};
