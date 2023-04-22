import { useLoaderData } from "react-router-dom";

import { Image, Col, Row, Space, Typography } from "antd";
import giraffe from "../images/Giraffe.png";
import logo from "../images/edulogo.png";
import right from "../images/right.gif";
import left from "../images/left.gif";
import * as API from "../api";

export async function CameraLoader({ request, params }: any) {
  try {
    return null;
  } catch (e: any) {
    return null;
  }
}

export const CameraPage = () => {
  const res = useLoaderData();

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Row style={{ height: "100%" }}>
        <Col span={4}>
          <Image src={left} height="100vh" />
        </Col>
        <Col span={16}>
          <Row style={{ padding: "12px" }} justify="end">
            <Space>
              <Typography.Title level={2}>
                <span className="logo-text-color1">ComEdu</span>{" "}
                <span className="logo-text-color2">Reunion</span>
              </Typography.Title>
              <Image src={giraffe} width={40} preview={false} />
            </Space>
          </Row>

          <Row style={{ height: "calc(100vh - 320px)" }}></Row>

          <Row justify="center">
            <Space align="center">
              <Typography.Title level={1}>
                <span className="logo-text-color1">Welcome</span>{" "}
              </Typography.Title>
              <Image src={logo} width={300} preview={false} />
            </Space>
          </Row>
        </Col>
        <Col span={4}>
          <Image src={right} height="100vh" />
        </Col>
      </Row>
    </div>
  );
};
