import React from "react";
import { Button, Input, Table, Typography } from "antd";
import { Link, useLoaderData } from "react-router-dom";

import { HeaderBar } from "../../components";
import { IndexPageLayout } from "../../layout";
import * as API from "../../api";

export async function userIndexLoader() {
  try {
    const users = await API.getUsers();

    return { users: users.data.data };
  } catch (e: any) {
    return { users: [] };
  }
}

export const UserIndex = () => {
  const { users } = useLoaderData() as any;

  const [usersData, setUsersData] = React.useState(users);

  const handleSearch = (e: any) => {
    setUsersData(
      users.filter(
        (data: any) =>
          data.email.includes(e.target.value) ||
          data.name.includes(e.target.value)
      )
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 50,
      render: (text: any) => <>{text}</>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
      render: (text: any) => <>{text}</>,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      width: 150,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      width: 150,
    },

    {
      title: "Phone",
      dataIndex: "tel",
      key: "tel",
      width: 100,
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      width: 50,
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
        title="User Management"
        btnData={
          [
            // <Link to="new">
            //   <Button>Add User</Button>
            // </Link>,
          ]
        }
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

              <div className="bar-table-name ">User Management list</div>
            </div>
            <Table
              columns={columns}
              dataSource={usersData}
              rowKey="id"
              scroll={{ y: "calc(100vh - 370px)", x: "max-content" }}
            />
          </div>
        </div>
      </div>
    </IndexPageLayout>
  );
};
