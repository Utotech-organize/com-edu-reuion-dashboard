import React from "react";
import { Button, Input, Table, Typography } from "antd";
import { Link, useLoaderData } from "react-router-dom";

import { HeaderBar } from "../../components";
import { IndexPageLayout } from "../../layout";
import * as API from "../../api";

export async function customerIndexLoader({ request, params }: any) {
  //example

  try {
    const customers = await API.getCustomers();
    console.log({ customers });

    return { customers: customers.data.data };
  } catch (e: any) {
    // return redirect("/login");
    return { customers: [] };
  }
}

export const CustomerIndex = () => {
  const { customers } = useLoaderData() as any;
  console.log({ customers });
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: any) => <>{text}</>,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Access Role",
      dataIndex: "role",
      key: "role",
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

              <Input placeholder="email or firstname" onChange={handleSearch} />

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
