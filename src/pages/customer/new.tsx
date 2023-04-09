import { Button, Form, Modal, Row } from "antd";
import { Link, redirect, useSubmit } from "react-router-dom";

import { CustomerForm, HeaderBar, UserForm } from "../../components";
import { IndexPageLayout } from "../../layout";

import * as API from "../../api";

export async function newCustomerAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);
  console.log({ submitData });

  try {
    const { data } = await API.createCustomer(submitData);
    console.log({ data });

    return redirect(`/customer/${data.id}`);
  } catch (e: any) {
    return { error: e.response.data.message };
  }
}

export const CustomerNew = () => {
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
        submit(values, { method: "post" });
      },
      cancelText: "Cancel",
      onCancel() {},
    });
  };

  return (
    <IndexPageLayout>
      <HeaderBar
        title="Customer Management"
        btnData={[
          <Link to="/customer">
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
          edit={false}
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
