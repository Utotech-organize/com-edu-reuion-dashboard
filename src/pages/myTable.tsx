import { Link, useLoaderData } from "react-router-dom";

import * as API from "../api";
import { Card, Image, Typography } from "antd";

import Stage from "../images/cinema.png";
import Entrance from "../images/walking-man.png";

export async function MapTableLoader({ request, params, slug }: any) {
  try {
    const desks = await API.getDesks();
    const data = await API.getBooking(slug);

    console.log({ data });

    //FIXME PHOOM
    // const ticket = await API.getBookingTicket(slug);

    return { desks: desks.data.data };
  } catch (e: any) {
    return { desks: [] };
  }
}

export const MyTable = () => {
  const { desks } = useLoaderData() as any;

  const exportColorWithStatus = (slug: any) => {
    let color = "";
    //FIXME PHOOM
    if (slug === "slug") {
      color = "#8598BD";
    } else color = "rgba(255, 202, 24, 0.4)";

    return color;
  };
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
                  background: exportColorWithStatus(""),
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
      </div>
    </div>
  );
};
