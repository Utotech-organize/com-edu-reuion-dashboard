import { Button, Col, Row, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { HeaderBar } from "../../components";
import { IndexPageLayout } from "../../layout";

import Mockup from "../../assets/mockup-tables.json";

const tables = [
  { id: 1, name: "A1" },
  { id: 2, name: "A2" },
  { id: 3, name: "A3" },
  { id: 4, name: "A4" },
  { id: 5, name: "A5" },
];

export const ReservationIndex = () => {
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
    if (status === "a") {
      color = "#FFCA18";
    } else if (status === "b") {
      color = "#8598BD";
    } else if (status === "c") {
      color = "rgba(255, 202, 24, 0.4)";
    }

    return color;
  };

  return (
    <IndexPageLayout>
      <HeaderBar title="Reservation" btnData={[<Button>Report Data</Button>]} />
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
                {Mockup.tables.map((d, index: any) => (
                  <div key={d.id} className="grid-item">
                    <Link to={`${d.id}`}>
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
                        {d.name}
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
                  <Space direction="horizontal" style={{ marginTop: "12px" }}>
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

                <Row
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
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </IndexPageLayout>
  );
};
