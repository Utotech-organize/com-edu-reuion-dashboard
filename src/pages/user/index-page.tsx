import { Button, Input, Table, Typography } from "antd";
import { Link } from "react-router-dom";
import { HeaderBar } from "../../components";
import { IndexPageLayout } from "../../layout";

export const UserIndex = () => {
  const data = [
    {
      id: "1",
      email: "john@admin.com",
      name: "John Brown",
      role: "Admin",
    },
    {
      id: "2",
      email: "jim@user.com",
      name: "Jim Green",
      role: "User",
    },
    {
      id: "3",
      email: "jpe@staff.com",
      name: "Joe Black",
      role: "Staff",
    },
  ];

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
        <Link to={record.id}>
          <Button>Edit</Button>
        </Link>
      ),
    },
  ] as any;

  return (
    <IndexPageLayout>
      <HeaderBar
        title="User Management"
        btnData={[
          <Link to="new">
            <Button>Add User</Button>
          </Link>,

          <Button>Report Data</Button>,
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

              <Input placeholder="email or name" />

              <div className="bar-table-name ">User Management list</div>
            </div>
            <Table
              columns={columns}
              dataSource={data}
              rowKey="id"
              scroll={{ y: "calc(100vh - 370px)", x: "max-content" }}
            />
          </div>
        </div>
      </div>
    </IndexPageLayout>
  );
};
