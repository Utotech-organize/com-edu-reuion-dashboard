import { Button, Input, Select, Table, Typography } from "antd";
import { Link } from "react-router-dom";
import { HeaderBar } from "../../components";
import { IndexPageLayout } from "../../layout";
import * as Icon from "@ant-design/icons";

export const PaymentIndex = () => {
  const { Option } = Select;

  const data = [
    {
      id: "1",
      email: "john@admin.com",
      lineId: "johnLine",
      lineName: "johnLineName",
      tableNo: "G1",
      status: "paid",

      name: "John Brown",
      role: "Admin",
    },
    {
      id: "2",
      email: "jim@user.com",
      lineId: "jimLine",
      lineName: "jimLineName",
      tableNo: "A3",
      name: "Jim Green",
      role: "User",
      status: "paid",
    },
    {
      id: "3",
      email: "joe@staff.com",
      lineId: "joeLine",
      tableNo: "A3",

      lineName: "joeLineName",

      name: "Joe Black",
      role: "Staff",
      status: "unpaid",
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
      title: "Line name",
      dataIndex: "lineName",
      key: "lineName",
    },
    {
      title: "Line id",
      dataIndex: "lineId",
      key: "lineId",
    },
    {
      title: "Table No.",
      dataIndex: "tableNo",
      key: "tableNo",
    },
    {
      title: "Status.",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_: any, record: any) => (
        <Link to={record.id}>
          <Button>
            <Icon.DollarOutlined />
          </Button>
        </Link>
      ),
    },
  ] as any;

  return (
    <IndexPageLayout>
      <HeaderBar
        title="Payment Details"
        btnData={[<Button>Report Data</Button>]}
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

              <Input placeholder="email or Line id, Line name" />

              <div className="bar-table-name">
                User Reservation list
                <Select placeholder="Select Status." style={{ width: "100px" }}>
                  <Option value="paid">Paid</Option>
                  <Option value="unpaid">Unpaid</Option>
                </Select>
              </div>
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
