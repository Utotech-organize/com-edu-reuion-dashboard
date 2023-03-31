import React from "react";
import { Button, Form, Modal, Row } from "antd";
import { Link, redirect, useLoaderData } from "react-router-dom";
import { HeaderBar, UserForm } from "../../components";
import { IndexPageLayout } from "../../layout";
import * as API from "../../api";

export async function loader({ request, params }: any) {
  //example

  console.log({ params });

  try {
    const user = await API.getUser(params.id);

    return { user: user.data.data };
  } catch (e: any) {
    localStorage.removeItem("token");

    // return redirect("/login");
    return { user: null };
  }
}

export const UserEdit = () => {
  const { user } = useLoaderData() as any;
  console.log({ user });

  const [form] = Form.useForm();

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
        //API.edit user
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
    form.setFieldsValue(user.users);
  }, []);

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
        <UserForm
          edit={true}
          title="User Details"
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
              <Form.Item>
                <Button type="primary" onClick={handleDelete}>
                  Delete
                </Button>
              </Form.Item>
            </Row>
          }
        />
      </div>
    </IndexPageLayout>
  );
};
