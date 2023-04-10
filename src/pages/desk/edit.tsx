import React, { useContext } from "react";
import {
  Button,
  Col,
  Row,
  Typography,
  Form,
  notification,
  Select,
  Input,
  InputNumber,
  Switch,
  Space,
  Tag,
} from "antd";
import {
  Link,
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router-dom";

import {
  HeaderBar,
  Mention,
  ModalBookingDetails,
  TableSelect,
} from "../../components";
import { IndexPageLayout } from "../../layout";
import { AuthContext } from "../../context/AuthContext";
import * as API from "../../api";

export async function editDeskLoader({ request, params }: any) {
  try {
    const desk = await API.getDesk(params.id);

    return { desk: desk.data.data };
  } catch (e: any) {
    return { desk: null };
  }
}

export const EditDesk = () => {
  const { desk } = useLoaderData() as any;

  const [form] = Form.useForm();
  const submit = useSubmit();
  const navigate = useNavigate();
  const action = useActionData() as any;

  const { onResponse } = useContext(AuthContext);

  const onFinished = (values: any) => {};

  const exportColorWithStatus = (status: any) => {
    let color = "";
    if (status === "available") {
      color = "#FFA800";
    } else if (status === "pending") {
      color = "#9CB0D7";
    } else if (status === "unavailable") {
      color = "rgba(255, 202, 24, 0.4)";
    }

    return color;
  };

  React.useEffect(() => {
    if (action && action.status) {
      onResponse(action.status, action.message);

      if (action.message === "Booking Successfully!") {
        navigate(`/booking/${action.bookingId}`);
      }
    }
  }, [action]);

  return (
    <IndexPageLayout>
      <HeaderBar
        title="Desk Management"
        btnData={[
          <Link to="/desk">
            <Button>Back</Button>
          </Link>,
        ]}
      />
      <div className="reserv-container">
        <div className="reserv-box">
          <Row gutter={20} style={{ minWidth: "95%", minHeight: 664 }}>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={14}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Space size="small" style={{ marginBottom: "10px" }}>
                <Typography.Title
                  level={4}
                  style={{
                    marginTop: "10px",
                    marginBottom: "12px",
                    width: "100%",
                  }}
                >
                  Table {desk && desk.label ? desk.label : "-"}
                </Typography.Title>
                <Tag color={exportColorWithStatus(desk.status)}>
                  {desk.status}
                </Tag>
              </Space>
              <TableSelect desk={desk} selectedSeat={[]} />
              <Mention notShow={true} />
            </Col>
            <Col xs={24} sm={24} md={24} lg={10}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography.Title
                  level={4}
                  style={{
                    marginTop: "10px",
                    marginBottom: "12px",
                    width: "100%",
                  }}
                >
                  Table Information
                </Typography.Title>
                <Form
                  form={form}
                  onFinish={onFinished}
                  name="user"
                  autoComplete="off"
                  colon={false}
                  layout="vertical"
                  initialValues={{ ...desk }}
                >
                  <Form.Item
                    label="Label"
                    name="label"
                    labelCol={{ span: 6 }}
                    rules={[{ required: true, message: "Please input Label!" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Price"
                    name="price"
                    labelCol={{ span: 6 }}
                    rules={[{ required: true, message: "Please input Price!" }]}
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item
                    label="Price / Chair"
                    name="chair_price"
                    labelCol={{ span: 6 }}
                    rules={[
                      {
                        required: true,
                        message: "Please input Price / Chair!",
                      },
                    ]}
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item
                    labelCol={{ span: 6 }}
                    label="Active"
                    name="active"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </IndexPageLayout>
  );
};
