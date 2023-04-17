import React, { useContext } from "react";
import { Form, Button, Input, Modal } from "antd";
import {
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";

import { HeaderBar, UploadImage } from "../components";
import { IndexPageLayout } from "../layout";
import * as API from "../api";
import { AuthContext } from "../context/AuthContext";

export async function settingLoader() {
  try {
    const settings = await API.getSettings();

    return { settings: settings.data.data };
  } catch (e: any) {
    return { settings: {} };
  }
}

export async function settingAction({ request }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);
  try {
    const { data } = await API.updateSetting(submitData);

    return {
      message: "Update Successfully!",
      status: "success",
    };
  } catch (e: any) {
    return { message: "Cannot update Setting!", status: "error" };
  }
}

export const SettingPage = () => {
  const { onResponse } = useContext(AuthContext);

  const { settings } = useLoaderData() as any;
  const [form] = Form.useForm();

  const { state } = useNavigation();
  const submit = useSubmit();
  const action = useActionData() as any;

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleLoader = (status: boolean) => {
    setLoading(status);
  };

  const onFinished = (values: any) => {
    Modal.confirm({
      title: "Warning !",
      content: (
        <div>
          <p>Are you sure to Edit Setting?</p>
        </div>
      ),
      okText: "Confirm",

      onOk() {
        const { fileList, ...value } = values;

        const payload = {
          ...value,
          bank_qr_code: fileList.length
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

  React.useEffect(() => {
    if (action && action.status) {
      onResponse(action.status, action.message);
    }
  }, [action]);

  return (
    <IndexPageLayout>
      <HeaderBar
        title="Settings"
        btnData={[
          <Button
            disabled={loading || state === "loading" || state === "submitting"}
            onClick={() => form.submit()}
          >
            Save
          </Button>,
        ]}
      />
      <div className="reserv-container">
        <div className="reserv-box">
          <div
            style={{
              height: "100%",
              padding: "0px 10px 10px 10px",
            }}
          >
            <Form
              form={form}
              name="customer"
              onFinish={onFinished}
              autoComplete="off"
              colon={false}
              layout="vertical"
              labelAlign="left"
              initialValues={{
                ...settings,
                fileList:
                  settings && settings.bank_qr_code
                    ? [{ uid: "-1", url: settings.bank_qr_code }]
                    : [],
              }}
              style={{
                padding: "20px",
              }}
            >
              <Form.Item
                label="Bank Name"
                name="bank"
                rules={[{ required: true, message: "Please input your bank!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Bank Account Name"
                name="bank_account_name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Bank Account Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Bank Account No."
                name="bank_account_no"
                rules={[
                  {
                    required: true,
                    message: "Please input your Bank Account No.!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <UploadImage
                data={
                  settings && settings.bank_qr_code
                    ? [{ uid: "-1", url: settings.bank_qr_code }]
                    : []
                }
                type="picture-card"
                loading={loading}
                handleLoader={handleLoader}
              />
            </Form>
          </div>
        </div>
      </div>
    </IndexPageLayout>
  );
};
