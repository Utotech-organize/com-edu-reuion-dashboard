import React from "react";
import { Button, Input, Table, Typography } from "antd";
import { Link, useLoaderData } from "react-router-dom";

import { HeaderBar } from "../../components";
import { IndexPageLayout } from "../../layout";
import * as API from "../../api";

export async function customerIndexLoader({ request, params }: any) {
  try {
    const customers = await API.getCustomers();

    return { customers: customers.data.data };
  } catch (e: any) {
    return { customers: [] };
  }
}

export const CustomerIndex = () => {
  const { customers } = useLoaderData() as any;
  const [searchTerms, setSearchTerms] = React.useState(customers);

  const handleSearch = (e: any) => {
    setSearchTerms(
      customers.filter(
        (data: any) =>
          data.email.includes(e.target.value) ||
          data.first_name.includes(e.target.value)
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
      render: (text: any) => <>{text ? text : `-`}</>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (_: any, record: any) => (
        <>
          {record.first_name} {record.last_name}
        </>
      ),
    },

    {
      title: "Phone",
      dataIndex: "tel",
      key: "tel",
      width: 100,
    },

    {
      title: "Channel",
      dataIndex: "channel",
      key: "channel",
      width: 150,
      render: (text: any) => text,
    },
    {
      title: "Generation",
      dataIndex: "generation",
      key: "generation",
      width: 120,
      render: (text: any) => <>{text ? text : `-`}</>,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 100,

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
        title="Customer Management"
        btnData={[
          <Link to="new">
            <Button>Add Customer</Button>
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

              <Input
                placeholder="Email or First Name"
                onChange={handleSearch}
              />

              <div className="bar-table-name ">Customers Management list</div>
            </div>
            <Table
              columns={columns}
              dataSource={searchTerms}
              rowKey="id"
              scroll={{ y: "calc(100vh - 370px)", x: "max-content" }}
            />
          </div>
        </div>
      </div>
    </IndexPageLayout>
  );
};
