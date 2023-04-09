import React from "react";
import { Button, Input, Table, Tag, Typography } from "antd";
import { Link, useLoaderData } from "react-router-dom";

import { CreateDeskModal, HeaderBar } from "../../components";
import { IndexPageLayout } from "../../layout";
import * as API from "../../api";

export async function deskIndexLoader() {
  try {
    const desks = await API.getDesks();

    return { desks: desks.data.data };
  } catch (e: any) {
    return { desks: [] };
  }
}

export const DeskIndex = () => {
  const { desks } = useLoaderData() as any;

  const [searchTerms, setSearchTerms] = React.useState(desks);
  const [modal, setModal] = React.useState<boolean>(false);

  const handleSearch = (e: any) => {
    setSearchTerms(
      desks.filter(
        (data: any) =>
          data.email.includes(e.target.value) ||
          data.first_name.includes(e.target.value)
      )
    );
  };

  const handleFinishedModal = (values: any) => {
    console.log({ values });
    const { chair_price, ...value } = values;
    const allLabel = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

    const chairs = allLabel.map((d: any) => {
      return {
        label: d,
        status: "available",
        chair_price: chair_price,
      };
    });

    const payload = {
      ...value,
      chairs: chairs,
    };

    console.log({ payload });
  };

  const columns = [
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
      render: (text: any) => <>{text}</>,
    },
    {
      title: "Price / Chair",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
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
        title="Desk Management"
        btnData={[<Button onClick={() => setModal(true)}>Add Desk</Button>]}
      />
      <CreateDeskModal
        open={modal}
        onCancel={() => setModal(false)}
        handleFinishedModal={handleFinishedModal}
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

              <Input placeholder="label" onChange={handleSearch} />

              <div className="bar-table-name">Desk Management list</div>
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
