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
  Modal,
} from "antd";
import {
  Link,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
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
import { ExclamationCircleFilled } from "@ant-design/icons";

export async function editDeskLoader({ request, params }: any) {
  try {
    const desk = await API.getDesk(params.id);

    return { desk: desk.data.data };
  } catch (e: any) {
    return { desk: null };
  }
}

export async function editDeskAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  try {
    const { data } = await API.updateDesk(
      params.id,
      JSON.parse(submitData.data)
    );
    console.log({ data });

    // return redirect(`/payment/${data.data.id}`);
    return { status: "success", message: "Update Successfully!" };
  } catch (e: any) {
    return { status: "error", message: "Can not Edit This Desk!" };
  }
}

export const EditDesk = () => {
  const { desk } = useLoaderData() as any;

  const [form] = Form.useForm();
  const submit = useSubmit();
  const action = useActionData() as any;
  const { state } = useNavigation();
  const navigate = useNavigate();

  const { onResponse } = useContext(AuthContext);

  const onFinished = (values: any) => {
    submit({ data: JSON.stringify(values) }, { method: "put" });
  };

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

  const deleteDesk = async () => {
    Modal.confirm({
      title: "Do you want to delete this Desk?",
      icon: <ExclamationCircleFilled />,
      async onOk() {
        try {
          const res = await API.deleteDesk(desk.id);

          if (res.status === 200) {
            navigate("/desk");
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

  React.useEffect(() => {
    if (action && action.status) {
      onResponse(action.status, action.message);
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
                  onReset={deleteDesk}
                  name="user"
                  autoComplete="off"
                  colon={false}
                  layout="vertical"
                  initialValues={{ ...desk }}
                  disabled={state === "loading" || state === "submitting"}
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
                    <InputNumber style={{ width: "100%" }} disabled />
                  </Form.Item>

                  <Form.Item
                    labelCol={{ span: 6 }}
                    label="Active"
                    name="active"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>

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
                      Save
                    </Button>
                  </Form.Item>

                  {desk.id > 30 && (
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
                        Delete Desk
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
