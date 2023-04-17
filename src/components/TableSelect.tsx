import { Tag, Typography } from "antd";
import React from "react";

interface TableSelectProps {
  desk: any;
  selectedSeat: any[];
  handleSelectedSeat?: (id: any) => void;
}

export const TableSelect: React.FC<TableSelectProps> = (
  props: TableSelectProps
) => {
  const { desk, selectedSeat, handleSelectedSeat } = props;

  const exportColorWithStatus = (status: any) => {
    let color = "";
    if (status === "available") {
      color = "#FFA800";
    } else if (status === "pending") {
      color = "#9CB0D7";
    } else if (status === "unavailable") {
      color = "rgba(255, 202, 24, 0.4)";
    }

    return color;
  };

  return (
    <div
      style={{
        height: "370px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography.Title
        level={4}
        style={{
          marginTop: "10px",
          marginBottom: "20px",
          width: "100%",
        }}
      >
        Seat <Tag>{desk.status}</Tag>
      </Typography.Title>
      <div id="big-circle" className="circle big">
        {desk && desk.label ? desk.label : "-"}
        {desk && desk.chairs && desk.chairs.length
          ? desk.chairs.map((d: any, index: any) => (
              <div
                key={d.chair_no}
                className={`circle ${d.chair_no}`}
                style={{
                  background:
                    selectedSeat.indexOf(d.id) > -1
                      ? "#00B1B1"
                      : exportColorWithStatus(d.status),
                  cursor:
                    d.status === "unavailable" || d.status === "pending"
                      ? "default"
                      : "pointer",
                }}
                onClick={() =>
                  d.status === "unavailable" || d.status === "pending"
                    ? {}
                    : handleSelectedSeat?.(d.id)
                }
              >
                {d.label}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
