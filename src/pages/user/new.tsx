import React, { useContext } from "react";
import { Button, Form, Modal, Row } from "antd";
import { Link, redirect, useActionData, useSubmit } from "react-router-dom";

import { HeaderBar, UserForm } from "../../components";
import { IndexPageLayout } from "../../layout";

import * as API from "../../api";
import { AuthContext } from "../../context/AuthContext";

export async function newUserAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  try {
    const res = await API.createUser(submitData);

    return redirect(`/user/${res.data.data.id}`);
  } catch (e: any) {
    return { message: "Cannot create this user!", status: "error" };
  }
}

export const UserNew = () => {
  const [form] = Form.useForm();
  const submit = useSubmit();
  const action = useActionData() as any;
  const { onResponse } = useContext(AuthContext);

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleLoader = (status: boolean) => {
    setLoading(status);
  };

  const handleSubmit = (values: any) => {
    Modal.confirm({
      title: "Warning !",
      content: (
        <div>
          <p>Are you sure to Create this User ?</p>
        </div>
      ),
      okText: "Confirm",

      onOk() {
        const { fileList, ...value } = values;

        const payload = {
          ...value,
          image_url: fileList.file ? fileList.file : "",
        };
        submit(payload, { method: "post" });
      },
      cancelText: "Cancel",
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
        title="User Management"
        btnData={[
          <Link to="/user">
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
          loading={loading}
          title="Add New User"
          form={form}
          onFinished={handleSubmit}
          handleLoader={handleLoader}
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
                <Button type="primary" htmlType="reset">
                  Reset
                </Button>
              </Form.Item>
            </Row>
          }
        />
      </div>
    </IndexPageLayout>
  );
};
