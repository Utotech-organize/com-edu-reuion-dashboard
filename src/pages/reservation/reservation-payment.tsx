import React, { useContext } from "react";
import {
  Button,
  Col,
  Row,
  Space,
  Typography,
  Form,
  Input,
  Tag,
  Upload,
} from "antd";
import { Link, Navigate, useLoaderData, useNavigate } from "react-router-dom";

import { HeaderBar, Mention, TableSelect } from "../../components";
import { IndexPageLayout } from "../../layout";
import * as API from "../../api";
import { AuthContext } from "../../context/AuthContext";

export async function reservationPaymentLoader({ request, params }: any) {
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

export const ReservationPayment = () => {
  const { customer, booking, desk } = useLoaderData() as any;
  const { onResponse } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedSeat, setSelectedSeat] = React.useState<any[]>([]);

  const handleApprovePayment = async () => {
    try {
      await API.editBooking(booking.id, {
        payment_status: "paid",
        status: "approve",
      });

      onResponse("success", "Approve Payment Successfully!");
      navigate(`/payment/${booking.id}`);
    } catch (e: any) {
      onResponse("error", "Can not Approve Payment!");
    }
  };

  return (
    <IndexPageLayout>
      <HeaderBar
        title="Booking"
        btnData={[
          <Link to="/booking">
            <Button>Back</Button>
          </Link>,
        ]}
      />
      <div className="reserv-container">
        <div className="reserv-box">
          <Form
            name="user"
            autoComplete="off"
            colon={false}
            layout="vertical"
            initialValues={{
              ...customer,
              payment_status: booking.payment_status,
              status: booking.status,
            }}
          >
            <Row gutter={20} style={{ minWidth: "95%" }}>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={12}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
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
                <TableSelect desk={desk} selectedSeat={selectedSeat} />
                <Mention notShow={true} />
              </Col>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Typography.Title
                  level={4}
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  Payment Infomation
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
                <Row
                  justify="center"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "8px",
                    marginTop: "20px",
                    height: "120px",
                  }}
                >
                  <Col span={12}>
                    <Col style={{ textAlign: "center" }}>
                      <Form.Item name="slip">
                        <Upload
                          listType="picture-card"
                          accept="image/*"
                          beforeUpload={(file) => {
                            return false;
                          }}
                        ></Upload>
                      </Form.Item>
                    </Col>
                  </Col>
                  {booking.payment_status === "unpaid" && (
                    <Col span={12}>
                      <Space
                        direction="vertical"
                        size="small"
                        style={{
                          width: "100%",
                        }}
                      >
                        <Button
                          block
                          onClick={handleApprovePayment}
                          style={{ background: "#303E57", color: "#ffffff" }}
                        >
                          Approve Payment
                        </Button>

                        {/* <Button
                        disabled
                        block
                        style={{ background: "#9A0000", color: "#ffffff" }}
                      >
                        Cancel Reservation
                      </Button> */}
                      </Space>
                    </Col>
                  )}
                </Row>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </IndexPageLayout>
  );
};
