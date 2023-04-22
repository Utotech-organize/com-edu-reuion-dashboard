import { Link, useLoaderData, useNavigate } from "react-router-dom";

import * as API from "../api";
import {
  Avatar,
  Button,
  Card,
  Image,
  Row,
  Typography,
  notification,
} from "antd";

import Stage from "../images/cinema.png";
import Entrance from "../images/walking-man.png";
import React from "react";

export async function MapTableLoader({ request, params }: any) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  try {
    const desks = await API.getDesks();
    const data = await API.getBookingWithTicket(code);

    //FIXME PHOOM
    // const ticket = await API.getBookingTicket(slug);

    return { desks: desks.data.data, result: data.data.data };
  } catch (e: any) {
    return { desks: [], result: null };
  }
}

export const MyTable = () => {
  const { desks, result } = useLoaderData() as any;
  const navigate = useNavigate();
  const exportColorWithStatus = (id: any) => {
    let color = "";
    //FIXME PHOOM
    if (id === result.desk?.id) {
      color = "#8598BD";
    } else color = "rgba(255, 202, 24, 0.4)";

    return color;
  };

  const customer = result && result.customer;

  React.useEffect(() => {
    if (!result) {
      notification["error"]({
        message: "Code is not exist !",
        placement: "bottomLeft",
        duration: 5,
      });
      navigate("/scan-code");
    }
  }, []);

  return (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}>
      <div
        className="app-mobile mobile  html-mobile body-mobile"
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Card style={{ marginBottom: "12px" }}>
          <Row
            justify="space-around"
            gutter={20}
            style={{ marginBottom: "12px" }}
          >
            <Avatar src={customer?.line_photo_url} />
            <Typography.Text>
              {customer?.first_name} {customer?.last_name}
            </Typography.Text>
            <Typography.Text>{customer?.generation}</Typography.Text>
          </Row>
          <Row> Chair No. : {result?.chairs_label}</Row>
        </Card>

        <div
          style={{
            marginBottom: "10px",
            paddingTop: "10px",
            width: "390px",
            borderRadius: "20px",
            borderStyle: "ridge",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image preview={false} src={Stage} style={{ width: "40px" }}></Image>
          <Typography className="black-text">เวที</Typography>
        </div>
        <div className="grid-container">
          {desks.map((d: any, index: any) => (
            <div key={d.id} className="grid-item">
              <div
                className="seat-mobile"
                style={{
                  height: "50px",
                  color: "#000000",
                  //FIXME PHOOM
                  background: exportColorWithStatus(d.id),
                }}
              >
                Table
                <br />
                {d.label}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: "10px",
            paddingTop: "10px",
            width: "390px",
            borderRadius: "20px",
            borderStyle: "ridge",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            preview={false}
            src={Entrance}
            style={{ width: "40px" }}
          ></Image>
          <Typography className="black-text">ทางเข้า</Typography>
        </div>
        <Link to="/scan-code">
          <div style={{ padding: "12px" }}>
            <Button type="primary" block style={{ background: "gray" }}>
              Scan Code
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
};
