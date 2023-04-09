import React from "react";
import { Button, Input, Table, Tag, Typography } from "antd";
import { Link, useLoaderData } from "react-router-dom";

import { HeaderBar } from "../../components";
import { IndexPageLayout } from "../../layout";
import * as API from "../../api";

export async function BookingIndexLoader() {
  try {
    const bookings = await API.getBookings();

    const resultBooking = bookings.data.data.filter(
      (d: any) => d.payment_status === "unpaid"
    );

    return { bookings: resultBooking };
  } catch (e: any) {
    return { bookings: [] };
  }
}

export const BookingIndex = () => {
  const { bookings } = useLoaderData() as any;
  console.log({ bookings });

  const [searchTerms, setSearchTerms] = React.useState(bookings);

  const handleSearch = (e: any) => {
    setSearchTerms(
      bookings.filter(
        (data: any) =>
          data.email.includes(e.target.value) ||
          data.first_name.includes(e.target.value)
      )
    );
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: any) => <>{text}</>,
    },
    {
      title: "Payment Status",
      dataIndex: "payment_status",
      key: "payment_status",
      render: (text: any) => (
        <Tag color={text === "unpaid" ? "warning" : "success"}> {text}</Tag>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: any) => (
        <Tag color={text === "pending" ? "blue" : "success"}>{text}</Tag>
      ),
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_: any, record: any) => (
        <Link to={`${record.id}`}>
          <Button>Edit</Button>
        </Link>
      ),
    },
  ] as any;

  return (
    <IndexPageLayout>
      <HeaderBar
        title="Booking Management"
        btnData={[
          <Link to="new">
            <Button>Add Booking</Button>
          </Link>,
        ]}
      />
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

              <Input placeholder="email or firstname" onChange={handleSearch} />

              <div className="bar-table-name ">Booking Management list</div>
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
