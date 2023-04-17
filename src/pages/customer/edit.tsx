import React, { useContext } from "react";
import { Button, Form, Modal, Row } from "antd";
import {
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { CustomerForm, HeaderBar, UserForm } from "../../components";
import { IndexPageLayout } from "../../layout";
import * as API from "../../api";
import { AuthContext } from "../../context/AuthContext";

export async function customerEditLoader({ request, params }: any) {
  try {
    const customer = await API.getCustomer(params.id);

    return { customer: customer.data.data };
  } catch (e: any) {
    return { user: null };
  }
}

export async function customerEditAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  switch (request.method) {
    case "PUT":
      try {
        const res = await API.editCustomer(submitData, params.id);

        return {
          message: "Update Successfully!",
          status: "success",
        };
      } catch (e: any) {
        return { error: e.response.data.message };
      }
    case "DELETE":
      try {
        const { data } = await API.deleteCustomer(params.id);

        return {
          message: "Delete Successfully!",
          status: "success",
        };
      } catch (e: any) {
        return { message: "Cannot delete this Customer!", status: "error" };
      }
  }
}

export const CustomerEdit = () => {
  const { onResponse } = useContext(AuthContext);

  const submit = useSubmit();

  const { customer } = useLoaderData() as any;
  const action = useActionData() as any;
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    Modal.confirm({
      title: "Warning !",
      content: (
        <div>
          <p>Are you sure to Edit this Customer ?</p>
        </div>
      ),
      okText: "Confirm",

      onOk() {
        submit(values, { method: "put" });
      },
      cancelText: "Cancel",
      onCancel() {},
    });
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Warning !",
      content: (
        <div>
          <p>Are you sure to Delete this Customer?</p>
        </div>
      ),
      okText: "Confirm",

      onOk() {
        submit({ id: customer.id }, { method: "delete" });
      },
      cancelText: "Cancel",
      onCancel() {},
    });
  };

  React.useEffect(() => {
    if (action && action.status) {
      onResponse(action.status, action.message);

      if (action.message === "Delete Successfully!") {
        navigate("/customer");
      }
    }
  }, [action]);

  return (
    <IndexPageLayout>
      <HeaderBar
        title="Customer Management"
        btnData={[
          <Link key="customer-back" to="/customer">
            <Button>Back</Button>
          </Link>,
        ]}
      />

      <div
        style={{
          height: "100%",
          padding: "0px 40px 20px 40px",
        }}
      >
        <CustomerForm
          data={customer}
          edit={true}
          title="Customer Details"
          form={form}
          onFinished={handleSubmit}
          footer={
            <Row
              justify="end"
              style={{
                marginTop: "24px",
                columnGap: "20px",
              }}
            >
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
              {/* <Form.Item>
                <Button type="primary" onClick={handleDelete}>
                  Delete
                </Button>
              </Form.Item> */}
            </Row>
          }
        />
      </div>
    </IndexPageLayout>
  );
};
