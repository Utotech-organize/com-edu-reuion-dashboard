import { Input, Row, Typography, Form, Button } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QrReader from "react-web-qr-reader";

export const ScanCode = () => {
  const nav = useNavigate();
  const delay = 500;

  const previewStyle = {
    height: 400,
    width: 300,
  };

  const [result, setResult] = useState<any>("No result");

  const handleScan = (result: any) => {
    if (result) {
      let spiltData = result.data.split("comedu-reunion:");

      setResult(result);
      nav(`/my-table?code=${spiltData[1]}`);
    }
  };

  const handleError = (error: any) => {
    console.log(error);
  };

  const onSubmit = (value: any) => {
    nav(`/my-table?code=${value.code}`);
  };

  return (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}>
      <div
        className="app-mobile mobile  html-mobile body-mobile"
        style={{
          display: "flex",

          height: "100vh",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row justify="center">
          <Typography.Title level={2}>
            <span className="logo-text-color1">ComEdu</span>{" "}
            <span className="logo-text-color2">Reunion</span>
          </Typography.Title>
        </Row>
        {/* FIXME PHOOM  */}
        {/* pls config camera device */}
        <QrReader
          delay={delay}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
        />
        {/* <p>{result.data}</p> */}

        <Form onFinish={onSubmit}>
          <Form.Item
            name="code"
            label="Code"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              block
              style={{ background: "gray" }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
