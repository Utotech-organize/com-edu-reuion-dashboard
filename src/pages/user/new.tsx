import { Button, Form, Modal, Row } from "antd";
import { Link, redirect, useSubmit } from "react-router-dom";

import { HeaderBar, UserForm } from "../../components";
import { IndexPageLayout } from "../../layout";

import * as API from "../../api";

export async function newUserAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);
  console.log({ submitData });

  try {
    const { data } = await API.register(submitData);
    console.log({ data });

    return redirect(`/user/${data.id}`);
  } catch (e: any) {
    return { error: e.response.data.message };
  }
}

export const UserNew = () => {
  const [form] = Form.useForm();

  const submit = useSubmit();

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
        //API.add user
        //example

        const payload = {
          email: "test3@gmail.com",
          password: "password123",
          firstname: "user1",
          lastname: "test",
          role: "user",
          // verified: true,
        };
        submit(payload, { method: "post" });

        //other way can use values to be an payload

        //submit(values, { method: "post" });
      },
      cancelText: "Cancel",
      onCancel() {},
    });
  };

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
          title="Add New User"
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
