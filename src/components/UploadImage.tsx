import { PlusOutlined } from "@ant-design/icons";
import { Form, Typography, Upload, UploadProps, message } from "antd";
import React from "react";

interface UploadImageProps {
  data?: any;
  type?: any;
  required?: boolean;
  loading: boolean;
  handleLoader: (status: boolean) => void;
}

export const UploadImage: React.FC<UploadImageProps> = (
  props: UploadImageProps
) => {
  const { data, type, required, loading, handleLoader } = props;
  const token = localStorage.getItem("token");
  const [fileList, setFileList] = React.useState<any>(data);

  const UploadProps: UploadProps = {
    name: "file",
    fileList: fileList,
    action: `${import.meta.env.VITE_APP_API_BASE_URL}/upload/receipt`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      channel: "dashboard",
    },
    listType: type ? type : "picture-card",
    accept: "image/*",
    onRemove: () => {
      setFileList([]);
    },
    onPreview: (file) => {
      window.open(fileList.data, "_blank");
    },

    onChange(info: any) {
      setFileList(info.fileList);

      if (info.file.status === "uploading") {
        handleLoader(true);
      }
      if (info.file.status === "done") {
        handleLoader(false);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
        handleLoader(false);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  const getFile = (e: any) => {
    if (e && e.file.response) {
      return { file: e.file.response.data };
    } else {
      return { file: null };
    }
  };

  return (
    <Form.Item
      labelCol={{ span: 4 }}
      style={{
        textAlign: "center",
      }}
      name="fileList"
      rules={[
        {
          required: required ? required : false,
          message: "Please Upload Receipt!",
        },
      ]}
      getValueFromEvent={getFile}
    >
      <Upload
        {...UploadProps}
        style={{
          width: 140,
          height: 200,
        }}
      >
        {fileList?.length || loading ? null : (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
    </Form.Item>
  );
};
