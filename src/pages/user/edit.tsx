import React from "react";
import { Button, Form, Modal, Row } from "antd";
import { Link } from "react-router-dom";
import { HeaderBar, UserForm } from "../../components";
import { IndexPageLayout } from "../../layout";

export const UserEdit = () => {
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
