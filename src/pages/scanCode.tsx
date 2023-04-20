import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QrReader from "react-web-qr-reader";

export const ScanCode = () => {
  const nav = useNavigate();
  const delay = 500;

  const previewStyle = {
    height: 500,
    width: 500,
  };

  const [result, setResult] = useState<any>("No result");

  console.log(result);

  const handleScan = (result: any) => {
    if (result) {
      setResult(result);
      nav(`/my-table?code=${result.data}`);
    }
  };

  const handleError = (error: any) => {
    console.log(error);
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <QrReader
        delay={delay}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
      <p>{result.data}</p>
    </div>
  );
};
