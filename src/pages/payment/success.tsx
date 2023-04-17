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
  notification,
  Modal,
} from "antd";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { HeaderBar } from "../../components";
import { IndexPageLayout } from "../../layout";
import * as API from "../../api";
import { CopyOutlined, ExclamationCircleFilled } from "@ant-design/icons";

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
  const { customer, booking, desk } = useLoaderData() as any;
  const navigate = useNavigate();
  const handleCancelPayment = async () => {
    Modal.confirm({
      title: "Do you want to delete this Payment?",
      icon: <ExclamationCircleFilled />,
      async onOk() {
        try {
          const res = await API.cancelBooking(booking.id);

          if (res.status === 200) {
            navigate("/payment");
          }
        } catch {
          notification["error"]({
            message: "Oops errors!",
            placement: "bottomLeft",
            duration: 5,
          });
        }
      },
      onCancel() {},
    });
  };

  const copy = async () => {
    await navigator.clipboard.writeText(booking.slug);
    notification.success({
      message: "Copy Successfully!",
      placement: "bottomLeft",
    });
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
                    color={
                      booking?.status === "pending"
                        ? "blue"
                        : booking?.status === "cancel"
                        ? "red"
                        : "success"
                    }
                  >
                    {booking?.status}
                  </Tag>
                </Space>
              </Space>
              <Row gutter={20}>
                <Col span={24}>
                  <h2>
                    <Space size="middle">
                      Booking ID {booking.slug}
                      <Button onClick={() => copy()}>
                        <CopyOutlined />
                      </Button>
                    </Space>
                  </h2>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      background: "white",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image src={booking.qrcode_image} height={150} />
                  </div>
                </Col>
                <Col span={24}>
                  <h3>Receipt</h3>
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
                </Col>
              </Row>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Form
                  name="user"
                  autoComplete="off"
                  colon={false}
                  layout="vertical"
                  onReset={handleCancelPayment}
                  initialValues={{
                    ...customer,
                    total: booking.total,
                    slug: booking.slug,
                    chairs_label: booking.chairs_label,
                    amount: booking.desk.chairs.length,
                    inspector: booking.inspector,
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
                  <Form.Item label="Inspector." name="inspector">
                    <Input disabled />
                  </Form.Item>
                  <Typography.Text>
                    Updated At :{" "}
                    {dayjs(booking.updated_at).format("DD/MM/YYYY HH:mm")}
                  </Typography.Text>
                  {booking.status != "cancel" && (
                    <Form.Item>
                      <Button
                        htmlType="reset"
                        block
                        style={{
                          background: "#9A0000",
                          color: "#ffffff",
                          height: "70px",
                        }}
                      >
                        Cancel Payment
                      </Button>
                    </Form.Item>
                  )}
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </IndexPageLayout>
  );
};
