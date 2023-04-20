import { Row, Typography } from "antd";
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

  console.log({ result });

  const handleScan = (result: any) => {
    if (result) {
      setResult(result);
      //FIXME PHOOM (remove , in slug value)
      nav(`/my-table?code=${result.data.split("comedu-reunion:")}`);
    }
  };

  const handleError = (error: any) => {
    console.log(error);
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
        <p>{result.data}</p>
      </div>
    </div>
  );
};
