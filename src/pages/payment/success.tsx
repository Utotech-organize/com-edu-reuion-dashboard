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
  Image,
  Tag,
} from "antd";
import { Link, useLoaderData } from "react-router-dom";
import { RcFile } from "rc-upload/lib/interface";

import { HeaderBar } from "../../components";
import { IndexPageLayout } from "../../layout";
import * as API from "../../api";
import useCopyToClipboard from "../../components/CopyToClipboard";
import { CopyOutlined } from "@ant-design/icons";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export async function paymentSuccessLoader({ request, params }: any) {
  try {
    const booking = await API.getBooking(params.id);
    const customer = await API.getCustomer(booking.data.data.customer.id);
    const desk = await API.getDesk(booking.data.data.desk.id);

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
  const [value, copy] = useCopyToClipboard();
  const { customer, booking, desk } = useLoaderData() as any;

  const swalCopy = () => {
    copy(booking.slug);
    console.log(booking.slug);
  };

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
                      booking?.payment_status === "unpaid"
                        ? "warning"
                        : "success"
                    }
                  >
                    {booking?.payment_status}
                  </Tag>
                  <Tag
                    color={booking?.status === "pending" ? "blue" : "success"}
                  >
                    {booking?.status}
                  </Tag>
                </Space>
              </Space>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flexDirection: "column" }}>
                  <h2>
                    Booking ID
                    <Button onClick={() => swalCopy()}>
                      <CopyOutlined />
                    </Button>
                  </h2>
                  <div
                    style={{
                      width: "100%",
                      background: "white",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image src={booking.qrcode_image} />
                  </div>
                </div>
                <div style={{ padding: "20px" }}></div>
                <div style={{ flexDirection: "column" }}>
                  <h2>Receipt</h2>
                  <div
                    style={{
                      width: "100%",
                      background: "white",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image src={booking.image_url} />
                  </div>
                </div>
              </div>

              {/* <div
                style={{
                  width: "100%",
                  height: "300px",
                  background: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image src={booking.qrcode_image} />
              </div> */}
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
                    total: booking.total,
                    slug: booking.slug,
                    chairs_label: booking.chairs_label,
                    amount: booking.desk.chairs.length,
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
                  <Form.Item label="Booking ID" name="slug">
                    <Input disabled />
                  </Form.Item>
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

                  <Form.Item label="Chair No." name="chairs_label">
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
