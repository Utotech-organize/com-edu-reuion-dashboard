import { Button, Col, Row, Space, Typography } from "antd";
import { Link, useLoaderData } from "react-router-dom";

import { HeaderBar } from "../../components";
import { IndexPageLayout } from "../../layout";

import * as API from "../../api";

export async function NewBookingLoader({ request, params }: any) {
  try {
    const desks = await API.getDesks();

    return { desks: desks.data.data };
  } catch (e: any) {
    return { desks: [] };
  }
}

export const NewBooking = () => {
  const { desks } = useLoaderData() as any;
  const mentions = [
    {
      text: "Table is available.",
      color: "#FFCA18",
    },
    {
      text: "Table is available but some seats are reserved.",
      color: "#8598BD",
    },

    {
      text: "Table is not available.",
      color: "rgba(255, 202, 24, 0.4)",
    },
  ];

  const exportColorWithStatus = (status: any) => {
    let color = "";
    if (status === "available") {
      color = "#FFCA18";
    } else if (status === "pending") {
      color = "#8598BD";
    } else if (status === "unavailable") {
      color = "rgba(255, 202, 24, 0.4)";
    }

    return color;
  };

  return (
    <IndexPageLayout>
      <HeaderBar
        title="Booking"
        btnData={[
          <Link to="/booking">
            <Button>Back</Button>
          </Link>,
        ]}
      />
      <div className="reserv-container">
        <div className="reserv-box">
          <Typography.Title
            level={4}
            style={{ marginTop: "10px", marginBottom: "20px" }}
          >
            Table
          </Typography.Title>
          <Row gutter={20} style={{ minWidth: "95%" }}>
            <Col xs={24} sm={24} md={24} lg={12}>
              <Row
                justify="center"
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#ffffff",
                  borderRadius: "8px",
                }}
              >
                Stage
              </Row>

              <div className="grid-container">
                {desks.map((d: any, index: any) => (
                  <div key={d.id} className="grid-item">
                    <Link
                      to={d.status === "unavailable" ? `` : `${d.id}`}
                      style={{
                        cursor:
                          d.status === "unavailable"
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      <div
                        className="seat"
                        style={{
                          width: "100%",
                          height: "70px",
                          color: "#000000",
                          background: exportColorWithStatus(d.status),
                        }}
                      >
                        Table
                        <br />
                        {d.label}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              <Row
                justify="center"
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#ffffff",
                  borderRadius: "8px",
                }}
              >
                Door
              </Row>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                }}
              >
                <Typography.Text
                  style={{
                    padding: "8px",
                  }}
                >
                  Mention
                </Typography.Text>
                {mentions.map((d: any) => (
                  <Space
                    key={`${d.text} `}
                    direction="horizontal"
                    style={{ marginTop: "12px" }}
                  >
                    <div
                      className="seat"
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

                {/* <Row
                  justify="center"
                  style={{
                    width: "100%",
                    padding: "8px",
                    background: "#ffffff",
                    borderRadius: "8px",
                    marginTop: "20px",
                  }}
                >
                  <Col span={12}>
                    <Col style={{ textAlign: "center" }}>
                      <Typography.Title style={{ margin: "0px" }} level={4}>
                        666 people
                      </Typography.Title>
                      <br />
                      amount of registered
                    </Col>
                  </Col>
                  <Col span={12}>
                    <Button
                      block
                      style={{ height: "70px", background: "#9C9D9D" }}
                    >
                      -
                    </Button>
                  </Col>
                </Row> */}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </IndexPageLayout>
  );
};
