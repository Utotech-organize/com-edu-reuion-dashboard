import React, { useContext } from "react";
import { Button, Form, Modal, Row } from "antd";
import {
  Link,
  redirect,
  useActionData,
  useLoaderData,
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
    // return redirect("/login");
    return { user: null };
  }
}

export async function customerEditAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);
  console.log({ submitData });

  try {
    const res = await API.editCustomer(submitData, params.id);
    console.log({ res });

    return {
      message: "Update Successfully!",
      status: "success",
    };
  } catch (e: any) {
    return { error: e.response.data.message };
  }
}

export const CustomerEdit = () => {
  const { onResponse } = useContext(AuthContext);

  const submit = useSubmit();

  const { customer } = useLoaderData() as any;
  const action = useActionData() as any;

  const [form] = Form.useForm();
  console.log(action);

  const handleSubmit = (values: any) => {
    Modal.confirm({
      title: "Warning !",
      content: (
        <div>
          <p>Are you sure to Edit this User ?</p>
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
          <p>Are you sure to Delete this User ?</p>
        </div>
      ),
      okText: "Confirm",

      onOk() {
        //API.delete user
      },
      cancelText: "Cancel",
      onCancel() {},
    });
  };

  React.useEffect(() => {
    form.setFieldsValue(customer);

    if (action && action.status) {
      onResponse(action.status, action.message);
    }
  }, [action]);

  return (
    <IndexPageLayout>
      <HeaderBar
        title="User Management"
        btnData={[
          <Link key="user-back" to="/user">
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
            </Row>
          }
        />
      </div>
    </IndexPageLayout>
  );
};
