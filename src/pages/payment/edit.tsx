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
import { PlusOutlined } from "@ant-design/icons";

import { HeaderBar } from "../../components";
import { IndexPageLayout } from "../../layout";
import Mockup from "../../assets/mockup-tables.json";
import * as API from "../../api";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export async function paymentEditLoader({ request, params }: any) {
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

export const PaymentEdit = () => {
  const { customer, booking, desk } = useLoaderData() as any;

  const [selectedSeat, setSelectedSeat] = React.useState([]) as any[];
  const [imageUrl, setImageUrl] = React.useState<any>([]);
  const [form] = Form.useForm();

  const mentions = [
    {
      text: "Seat is available.",
      color: "#FFA800",
    },

    {
      text: "Seat is not available.",
      color: "#00B1B1",
    },
  ];

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    // return isJpgOrPng && isLt2M;
    return true;
  };

  const handleChange = (info: any) => {
    // if (info.file.status === "uploading") {
    //   setLoading(true);
    //   return;
    // }
    // if (info.file.status === "done") {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj as RcFile, (url) => {
    //     setLoading(false);
    //     setImageUrl(url);
    //   });
    // }

    setImageUrl(info.fileList);
  };

  React.useEffect(() => {
    form.setFieldsValue({});
  }, []);

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
                  A3 <Tag color={"warning"}>UnPaid</Tag>
                </Typography.Title>
                <div id="big-circle" className="circle big">
                  A3
                  {Mockup.seats.map((d: any, index: any) => (
                    <div
                      key={d.name}
                      className={`circle ${d.label}`}
                      style={{
                        background: index < 6 ? "#FFA800" : "#00B1B1",
                      }}
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
                  form={form}
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
                  <Form.Item label="FirstName - LastName" name="name">
                    <Input />
                  </Form.Item>

                  <Form.Item label="Phone" name="phone">
                    <Input />
                  </Form.Item>

                  <Form.Item label="Table No." name="tableNo">
                    <Input />
                  </Form.Item>
                  <Row gutter={20}>
                    <Col span={12}>
                      <Form.Item label="Amount" name="amount">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Total" name="total">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row
                    justify="center"
                    style={{
                      width: "100%",
                      padding: "8px",
                      background: "#ffffff",
                      borderRadius: "8px",
                      marginTop: "20px",
                      height: "120px",
                    }}
                  >
                    <Col span={12}>
                      <Col style={{ textAlign: "center" }}>
                        <Form.Item name="slip">
                          <Upload
                            // multiple={true}
                            // onPreview={handlePreview}
                            listType="picture-card"
                            accept="image/*"
                            beforeUpload={(file) => {
                              return false;
                            }}
                            onChange={handleChange}
                          >
                            {!imageUrl.length ? (
                              <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                              </div>
                            ) : null}
                          </Upload>
                        </Form.Item>
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
                        <Link to="success">
                          <Button
                            disabled={form.getFieldValue("slip") ? false : true}
                            block
                            style={{ background: "#303E57", color: "#ffffff" }}
                          >
                            Confirm & Pay
                          </Button>
                        </Link>

                        <Button
                          disabled
                          block
                          style={{ background: "#9A0000", color: "#ffffff" }}
                        >
                          Cancel Reservation
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
