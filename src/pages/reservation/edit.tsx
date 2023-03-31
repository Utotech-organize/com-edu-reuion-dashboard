import React from "react";
import { Button, Col, Row, Space, Typography, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { HeaderBar } from "../../components";
import { IndexPageLayout } from "../../layout";
import Mockup from "../../assets/mockup-tables.json";

export const ReservationEdit = () => {
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
              <div
                style={{
                  height: "370px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography.Title
                  level={4}
                  style={{
                    marginTop: "10px",
                    marginBottom: "20px",
                    width: "100%",
                  }}
                >
                  Seat
                </Typography.Title>
                <div id="big-circle" className="circle big">
                  A3
                  {Mockup.seats.map((d: any, index: any) => (
                    <div
                      key={d.name}
                      className={`circle ${d.label}`}
                      style={{
                        background:
                          selectedSeat.indexOf(d.id) > -1
                            ? "rgb(156, 176, 215)"
                            : index < 6
                            ? "#FFA800"
                            : "#00B1B1",
                      }}
                      onClick={() =>
                        setSelectedSeat((prev: any) => [...prev, d.id])
                      }
                    >
                      {d.name}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography.Text
                  style={{
                    padding: "8px",
                  }}
                >
                  Mention
                </Typography.Text>
                {mentions.map((d: any) => (
                  <Space
                    key={d.text}
                    direction="horizontal"
                    style={{ marginTop: "12px" }}
                  >
                    <div
                      className="seat"
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
                >
                  <Typography.Title
                    level={4}
                    style={{
                      marginTop: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    Reserve Detail
                  </Typography.Title>
                  <Form.Item
                    label="FirstName - LastName"
                    name="name"
                    rules={[
                      { required: true, message: "Please input your Name!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                      { required: true, message: "Please input your Phone!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Working Address"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Working Address!",
                      },
                    ]}
                  >
                    <Input.TextArea rows={3} />
                  </Form.Item>

                  <Form.Item label="Email" name="email">
                    <Input />
                  </Form.Item>

                  <Row
                    justify="center"
                    style={{
                      width: "100%",
                      padding: "8px",
                      background: "#ffffff",
                      borderRadius: "8px",
                      marginTop: "20px",
                    }}
                  >
                    <Col span={12}>
                      <Col style={{ textAlign: "center" }}>
                        <Typography.Title style={{ margin: "0px" }} level={4}>
                          666 people
                        </Typography.Title>
                        <br />
                        amount of registered
                      </Col>
                    </Col>
                    <Col span={12}>
                      <Space
                        direction="vertical"
                        size="small"
                        style={{
                          width: "100%",
                        }}
                      >
                        <Link to="payment">
                          <Button
                            block
                            style={{ background: "#303E57", color: "#ffffff" }}
                          >
                            Reserve
                          </Button>
                        </Link>

                        <Button
                          disabled
                          block
                          style={{ background: "#FFA800", color: "#ffffff" }}
                        >
                          Reserve All
                        </Button>
                      </Space>
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
