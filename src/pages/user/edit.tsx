import React, { useContext } from "react";
import { Button, Form, Modal, Row, Spin } from "antd";
import {
  Link,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { HeaderBar, UserForm } from "../../components";
import { IndexPageLayout } from "../../layout";
import * as API from "../../api";
import { AuthContext } from "../../context/AuthContext";

export async function userEditLoader({ request, params }: any) {
  try {
    const user = await API.getUser(params.id);

    return { user: user.data.data };
  } catch (e: any) {
    return { user: null };
  }
}

export async function editUserAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  switch (request.method) {
    case "PUT":
      try {
        const { data } = await API.editUser(params.id, submitData);

        return {
          message: "Update Successfully!",
          status: "success",
        };
      } catch (e: any) {
        return { message: "Cannot update this user!", status: "error" };
      }

    case "DELETE":
      try {
        const { data } = await API.deleteUser(params.id);

        return {
          message: "Delete Successfully!",
          status: "success",
        };
      } catch (e: any) {
        return { message: "Cannot delete this user!", status: "error" };
      }
  }
}

export const UserEdit = () => {
  const { onResponse } = useContext(AuthContext);
  const navigate = useNavigate();
  const { user } = useLoaderData() as any;

  const submit = useSubmit();
  const action = useActionData() as any;

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleLoader = (status: boolean) => {
    setLoading(status);
  };

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
        const { fileList, ...value } = values;

        const payload = {
          ...value,
          image_url: fileList.length
            ? fileList[0].url
            : fileList && fileList.file
            ? fileList.file
            : "",
        };

        submit(payload, { method: "put" });
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
          <p>Are you sure to Delete this User?</p>
        </div>
      ),
      okText: "Confirm",

      onOk() {
        submit({ id: user.id }, { method: "delete" });
      },
      cancelText: "Cancel",
      onCancel() {},
    });
  };

  React.useEffect(() => {
    if (action && action.status) {
      onResponse(action.status, action.message);

      if (action.message === "Delete Successfully!") {
        navigate("/user");
      }
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
        <UserForm
          data={user}
          loading={loading}
          edit={true}
          title="User Details"
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
