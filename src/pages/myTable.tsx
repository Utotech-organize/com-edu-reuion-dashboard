import { Link, useLoaderData } from "react-router-dom";

import * as API from "../api";

export async function MapTableLoader({ request, params }: any) {
  try {
    const desks = await API.getDesks();

    return { desks: desks.data.data };
  } catch (e: any) {
    return { desks: [] };
  }
}

export const MyTable = () => {
  const { desks } = useLoaderData() as any;

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
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="grid-container">
        {desks.map((d: any, index: any) => (
          <div key={d.id} className="grid-item">
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
          </div>
        ))}
      </div>
    </div>
  );
};
