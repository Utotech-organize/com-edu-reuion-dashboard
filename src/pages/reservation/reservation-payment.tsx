import React from "react";
import {
  Button,
  Col,
  Row,
  Space,
  Typography,
  Form,
  Input,
  notification,
} from "antd";
import { Link } from "react-router-dom";
import { HeaderBar } from "../../components";
import { IndexPageLayout } from "../../layout";
import Mockup from "../../assets/mockup-tables.json";
import * as Icon from "@ant-design/icons";

export const ReservationPayment = () => {
  const [selectedSeat, setSelectedSeat] = React.useState([]) as any[];
  const mentions = [
    {
      text: "Seat is available.",
      color: "#FFA800",
    },
    {
      text: "Your selected seat",
      color: "#9CB0D7",
    },

    {
      text: "Seat is not available.",
      color: "#00B1B1",
    },
  ];

  const copy = async () => {
    await navigator.clipboard.writeText("123-456-7890");
    notification.success({
      message: "Copy Successfully!",
      placement: "bottomLeft",
    });
  };

  return (
    <IndexPageLayout>
      <HeaderBar
        title="Reservation"
        btnData={[
          <Link to="/reservation">
            <Button>Back</Button>
          </Link>,
        ]}
      />
      <div className="reserv-container">
        <div className="reserv-box">
          <Row gutter={20} style={{ minWidth: "95%" }}>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={12}
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              {" "}
              <Typography.Title
                level={4}
                style={{
                  marginTop: "10px",
                  marginBottom: "20px",
                }}
              >
                Reserve Details
              </Typography.Title>
              <Form
                // form={form}
                name="user"
                // onFinish={onFinished}
                autoComplete="off"
                colon={false}
                layout="vertical"
                style={{ padding: "20px" }}
              >
                <Typography.Title
                  level={4}
                  style={{
                    marginTop: "10px",
                    marginBottom: "20px",
                  }}
                >
                  Table A3
                </Typography.Title>
                <Form.Item label="Seat NO." name="no">
                  <Input />
                </Form.Item>

                <Form.Item label="Amount" name="amount">
                  <Input />
                </Form.Item>

                <Form.Item label="Price / Seat" name="price">
                  <Input />
                </Form.Item>

                <Form.Item label="Total" name="total">
                  <Input />
                </Form.Item>
                <Typography.Text>(2 seat x 300 Bath)</Typography.Text>
              </Form>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12}>
              <Typography.Title
                level={4}
                style={{
                  marginTop: "10px",
                  marginBottom: "20px",
                }}
              >
                Payment Infomation
              </Typography.Title>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "30px",
                  background: "#303E57",
                  borderRadius: "12px",
                }}
              >
                <Row>
                  <Col span={10}>
                    <Typography.Title
                      level={3}
                      style={{
                        color: "#F6B63B",
                      }}
                    >
                      ชื่อธนาคาร
                    </Typography.Title>
                  </Col>
                  <Col span={14}>
                    <Typography.Title
                      level={3}
                      style={{
                        color: "#F6B63B",
                      }}
                    >
                      ธนาคารกรุงเทพ
                    </Typography.Title>
                  </Col>
                </Row>

                <Row>
                  <Col span={10}>
                    <Typography.Title
                      level={3}
                      style={{
                        color: "#F6B63B",
                      }}
                    >
                      ชื่อบัญชี
                    </Typography.Title>
                  </Col>
                  <Col span={14}>
                    <Typography.Title
                      level={3}
                      style={{
                        color: "#F6B63B",
                      }}
                    >
                      <span>น.ส. ภัทรวาดี ชาตะ และ นาย วัชพล เหลาทอง</span>
                    </Typography.Title>
                  </Col>
                </Row>

                <Typography.Title
                  level={3}
                  style={{
                    color: "#F6B63B",
                  }}
                >
                  เลขบัญชี
                </Typography.Title>
                <Row
                  style={{
                    background: "#ffffff",
                    borderRadius: "8px",
                  }}
                >
                  <Col
                    span={22}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "18px",
                    }}
                  >
                    123-456-7890
                  </Col>
                  <Col span={2}>
                    <Button block onClick={copy}>
                      <Icon.CopyOutlined />
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Row justify="end">
            <Button type="primary" htmlType="submit">
              Confirm
            </Button>
          </Row>
        </div>
      </div>
    </IndexPageLayout>
  );
};
