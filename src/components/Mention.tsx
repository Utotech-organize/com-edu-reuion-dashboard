import { CopyOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Typography, notification } from "antd";
import React from "react";

interface MentionProps {
  notShow?: boolean;
}

export const Mention: React.FC<MentionProps> = (props: MentionProps) => {
  const { notShow } = props;
  const mentions = [
    {
      text: "Seat is available.",
      color: "#FFA800",
    },
    {
      text: "Your selected seat",
      color: "#00B1B1",
    },
    {
      text: "Seat is on pending",
      color: "#9CB0D7",
    },
    {
      text: "Seat is not available.",
      color: "rgba(255, 202, 24, 0.4)",
    },
  ];

  const copy = async () => {
    await navigator.clipboard.writeText("123-456-7890");
    notification.success({
      message: "Copy Successfully!",
      placement: "bottomLeft",
    });
  };

  return (
    <Row gutter={20}>
      <Col xs={24} sm={24} md={24} lg={10}>
        <Typography.Text
          style={{
            padding: "8px",
          }}
        >
          Mention
        </Typography.Text>
        <br />
        {mentions.map((d: any) => (
          <Space
            key={d.text}
            direction="horizontal"
            style={{ marginTop: "12px" }}
          >
            <div
              className="mention"
              style={{
                background: d.color,
                textAlign: "center",
                cursor: "default",
              }}
            >
              Table
              <br />
              Ax
            </div>
            {d.text}
          </Space>
        ))}
      </Col>
      {!notShow && (
        <Col xs={24} sm={24} md={24} lg={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "12px",
              background: "#303E57",
              borderRadius: "12px",
              marginTop: "12px",
            }}
          >
            <Row>
              <Col span={10}>
                <Typography.Title
                  level={4}
                  style={{
                    color: "#F6B63B",
                    marginTop: "12px",
                  }}
                >
                  ชื่อธนาคาร
                </Typography.Title>
              </Col>
              <Col span={14}>
                <Typography.Title
                  level={5}
                  style={{
                    color: "#F6B63B",
                    marginTop: "16px",
                  }}
                >
                  ธนาคารกรุงเทพ
                </Typography.Title>
              </Col>
            </Row>

            <Row>
              <Col span={10}>
                <Typography.Title
                  level={4}
                  style={{
                    color: "#F6B63B",
                    marginTop: "12px",
                  }}
                >
                  ชื่อบัญชี
                </Typography.Title>
              </Col>
              <Col span={14}>
                <Typography.Title
                  level={5}
                  style={{
                    color: "#F6B63B",
                    marginTop: "16px",
                  }}
                >
                  <span>น.ส. ภัทรวาดี ชาตะ และ นาย วัชพล เหลาทอง</span>
                </Typography.Title>
              </Col>
            </Row>

            <Typography.Title
              level={4}
              style={{
                color: "#F6B63B",
                marginTop: "12px",
              }}
            >
              เลขบัญชี
            </Typography.Title>
            <Row
              style={{
                background: "#ffffff",
                borderRadius: "8px",
              }}
            >
              <Col
                span={20}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "18px",
                }}
              >
                123-456-7890
              </Col>
              <Col span={4}>
                <Button block onClick={copy}>
                  <CopyOutlined />
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      )}
    </Row>
  );
};
