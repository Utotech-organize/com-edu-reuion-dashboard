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
import { Link } from "react-router-dom";
import { HeaderBar } from "../../components";
import { IndexPageLayout } from "../../layout";
import Mockup from "../../assets/mockup-tables.json";
import { RcFile } from "rc-upload/lib/interface";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const PaymentSuccess = () => {
  const [selectedSeat, setSelectedSeat] = React.useState([]) as any[];
  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<any>([]);
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
            <Col xs={24} sm={24} md={24} lg={12}>
              <Typography.Title
                level={4}
                style={{
                  marginTop: "10px",
                  marginBottom: "20px",
                  width: "100%",
                }}
              >
                A3 <Tag color="success">Paid</Tag>
              </Typography.Title>
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
                    <Form.Item name="slip">
                      <Upload
                        // multiple={true}
                        listType="picture-card"
                        accept="image/*"
                        beforeUpload={(file) => {
                          return false;
                        }}
                        onChange={handleChange}
                        // onPreview={handlePreview}
                      >
                        {!imageUrl.length ? (
                          <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                          </div>
                        ) : null}
                      </Upload>
                    </Form.Item>
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
