import React, { useContext, useState } from "react";
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
  Modal,
} from "antd";
import {
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router-dom";

import { HeaderBar, Mention, TableSelect, UploadImage } from "../../components";
import { AuthContext } from "../../context/AuthContext";
import { IndexPageLayout } from "../../layout";
import * as API from "../../api";
import FormItem from "antd/es/form/FormItem";
import { ExclamationCircleFilled } from "@ant-design/icons";

export async function reservationPaymentLoader({ request, params }: any) {
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

export async function reservationPaymentAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  try {
    const { data } = await API.editBooking(params.id, submitData);

    return redirect(`/payment/${data.data.id}`);
  } catch (e: any) {
    return { status: "error", message: "Can not Approve Payment!" };
  }
}

export const ReservationPayment = () => {
  const { customer, booking, desk } = useLoaderData() as any;
  const { onResponse } = useContext(AuthContext);
  const navigate = useNavigate();

  const selectedSeat = booking.desk.chairs.map((d: any) => d.id);
  const action = useActionData() as any;
  const submit = useSubmit();

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleLading = (status: boolean) => {
    setLoading(status);
  };

  const handleApprovePayment = async (values: any) => {
    const { fileList, ...value } = values;

    const payload = {
      payment_status: "paid",
      status: "approve",
      image_url: fileList.length
        ? fileList[0].url
        : fileList && fileList.file
        ? fileList.file
        : "",
    };

    submit(payload, { method: "put" });
  };

  //FIXME phoom did this please p'aon fixed this TvT
  const handleCancelPayment = async () => {
    Modal.confirm({
      title: "Do you want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content:
        "When clicked the OK button, this dialog will be closed after delete this",
      async onOk() {
        try {
          const res = await API.cancelBooking(booking.id);

          if (res.status === 200) {
            await new Promise((resolve) => {
              setTimeout(resolve, 1000);
              navigate("/booking");
              return;
            });
          }
        } catch {
          return console.log("Oops errors!");
        }
      },
      onCancel() {},
    });
  };

  React.useEffect(() => {
    if (action && action.message === "Can not Approve Payment!") {
      onResponse(action.status, action.message);
    }
  }, [action]);

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
            onFinish={handleApprovePayment}
            onReset={handleCancelPayment}
            initialValues={{
              ...customer,
              chairs_no: booking.desk.chairs
                .map((d: any) => d.label)
                .toString(),
              chair_price: booking.desk.chair_price,
              total:
                booking.desk.chairs.length === 10
                  ? booking.desk.price
                  : booking.desk.chairs.length * booking.desk.chair_price,
              payment_status: booking.payment_status,
              status: booking.status,
              fileList:
                booking && booking.image_url
                  ? [{ uid: "-1", url: booking.image_url }]
                  : [],
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

                <Form.Item label="Chair No." name="chairs_no">
                  <Input disabled />
                </Form.Item>
                <Row gutter={20}>
                  <Col span={12}>
                    <Form.Item label="Price / Chair" name="chair_price">
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
                      <UploadImage
                        data={
                          booking && booking.image_url
                            ? [{ uid: "-1", url: booking.image_url }]
                            : []
                        }
                        loading={loading}
                        required={true}
                        handleLoader={handleLading}
                      />
                    </Col>
                  </Col>
                  {booking.payment_status === "unpaid" && (
                    <Col span={12}>
                      <Form.Item>
                        <Button
                          htmlType="submit"
                          block
                          style={{
                            background: "#303E57",
                            color: "#ffffff",
                            height: "70px",
                          }}
                        >
                          Approve Payment
                        </Button>
                      </Form.Item>
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
                          Cancel Reservation
                        </Button>
                      </Form.Item>

                      {/* </Space> */}
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
