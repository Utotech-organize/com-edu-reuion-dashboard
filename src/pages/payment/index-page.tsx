import React from "react";
import { Button, Input, Table, Tag, Typography } from "antd";
import { Link, useLoaderData } from "react-router-dom";

import { HeaderBar } from "../../components";
import { IndexPageLayout } from "../../layout";
import * as API from "../../api";
import { DollarOutlined } from "@ant-design/icons";
import numeral from "numeral";

export async function paymentIndexLoader() {
  try {
    const bookings = await API.getBookings();

    const resultBooking = bookings.data.data.filter(
      (d: any) => d.payment_status === "paid"
    );

    return { bookings: resultBooking };
  } catch (e: any) {
    return { bookings: [] };
  }
}

export const PaymentIndex = () => {
  const { bookings } = useLoaderData() as any;

  const [searchTerms, setSearchTerms] = React.useState(bookings);

  const handleSearch = (e: any) => {
    setSearchTerms(
      bookings.filter(
        (data: any) =>
          (data.customer?.first_name ?? "")
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          (data.desk?.label ?? "")
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
      )
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (text: any) => <>{text}</>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
      render: (_: any, render: any) => render.customer.email,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (_: any, record: any) => (
        <>
          {record.customer.first_name} {record.customer.last_name}
        </>
      ),
    },
    {
      title: "Phone",
      dataIndex: "tel",
      key: "tel",
      width: 100,
      render: (_: any, record: any) => (
        <>{record.customer.tel ? record.customer.tel : "-"}</>
      ),
    },
    {
      title: "Table No.",
      dataIndex: "label",
      key: "label",
      width: 100,
      align: "center",
      render: (_: any, record: any) => (
        <Tag color="#f50">{record.desk?.label}</Tag>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      width: 100,
      render: (text: any) => <>{numeral(text).format("0,0.00")}</>,
    },
    {
      title: "Payment Status",
      dataIndex: "payment_status",
      key: "payment_status",
      width: 130,
      align: "center",
      render: (text: any) => (
        <Tag color={text === "unpaid" ? "warning" : "success"}> {text}</Tag>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 100,
      render: (text: any) => (
        <Tag
          color={
            text === "pending" ? "blue" : text === "cancel" ? "red" : "success"
          }
        >
          {text}
        </Tag>
      ),
    },
    {
      title: "Inspector",
      dataIndex: "inspector",
      key: "inspector",
      align: "center",
      width: 100,
      render: (text: any) => text,
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      width: 100,
      render: (_: any, record: any) => (
        <Link to={`${record.id}`}>
          <Button>
            <DollarOutlined />
          </Button>
        </Link>
      ),
    },
  ] as any;

  return (
    <IndexPageLayout>
      <HeaderBar title="Booking Management" btnData={[]} />
      <div className="reserv-container">
        <div className="reserv-box">
          <div
            style={{
              height: "100%",
              padding: "0px 10px 10px 10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography.Title level={5} style={{ margin: "0px" }}>
                Search
              </Typography.Title>

              <Input
                placeholder="First Name or Table No."
                onChange={handleSearch}
              />

              <div className="bar-table-name ">Payment Management list</div>
            </div>
            <Table
              columns={columns}
              dataSource={searchTerms}
              rowKey="id"
              scroll={{ y: "calc(100vh - 440px)", x: "max-content" }}
              pagination={{
                pageSize: 10,
              }}
            />
          </div>
        </div>
      </div>
    </IndexPageLayout>
  );
};
