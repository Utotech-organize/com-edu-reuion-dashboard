import { Button, Form, Modal, Row } from "antd";
import { Link, redirect, useSubmit } from "react-router-dom";

import { CustomerForm, HeaderBar, UserForm } from "../../components";
import { IndexPageLayout } from "../../layout";

import * as API from "../../api";

export async function newCustomerAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  try {
    const { data } = await API.createCustomer(submitData);

    return redirect(`/customer/${data.id}`);
  } catch (e: any) {
    return { error: e.response.data.message };
  }
}

export const CustomerNew = () => {
  const [form] = Form.useForm();

  const submit = useSubmit();

  const handleSubmit = (values: any) => {
    delete values.line_liff_id; //FIXME pho0m remove all line data in create because it can be show in get single
    delete values.line_display_name;
    delete values.line_photo_url;

    Modal.confirm({
      title: "Warning !",
      content: (
        <div>
          <p>Are you sure to Create this Customer?</p>
        </div>
      ),
      okText: "Confirm",

      onOk() {
        submit({ ...values, channel: "dashboard" }, { method: "post" });
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
