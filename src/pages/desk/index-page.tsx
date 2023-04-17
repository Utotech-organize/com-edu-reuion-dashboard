import React from "react";
import { Button, Input, Space, Table, Tag, Typography } from "antd";
import {
  Link,
  redirect,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";

import { CreateDeskModal, HeaderBar } from "../../components";
import { IndexPageLayout } from "../../layout";
import * as API from "../../api";
import numeral from "numeral";

export async function deskIndexLoader() {
  try {
    const desks = await API.getDesks();

    return { desks: desks.data.data };
  } catch (e: any) {
    return { desks: [] };
  }
}

export async function deskIndexAction({ request }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);
  const data = JSON.parse(submitData.data);
  try {
    const res = await API.createDesk(data);

    return redirect(`/desk/${res.data.data.id}`);
  } catch (e: any) {
    return { error: e.response.data.message };
  }
}

export const DeskIndex = () => {
  const { desks } = useLoaderData() as any;

  const [searchTerms, setSearchTerms] = React.useState(desks);
  const [modal, setModal] = React.useState<boolean>(false);
  const submit = useSubmit();
  const { state } = useNavigation();
  const handleSearch = (e: any) => {
    setSearchTerms(
      desks.filter((data: any) =>
        (data.label ?? "").toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleFinishedModal = (values: any) => {
    const { chair_price, ...value } = values;
    const allLabel = [
      { label: "A", chair_no: "one" },
      { label: "B", chair_no: "two" },
      { label: "C", chair_no: "three" },
      { label: "D", chair_no: "four" },
      { label: "E", chair_no: "five" },
      { label: "F", chair_no: "six" },
      { label: "G", chair_no: "seven" },
      { label: "H", chair_no: "eight" },
      { label: "I", chair_no: "nine" },
      { label: "J", chair_no: "ten" },
    ];

    const chairs = allLabel.map((d: any) => {
      return {
        label: d.label,
        status: "available",
        price: chair_price,
        chair_no: d.chair_no,
      };
    });

    const payload = {
      ...value,
      chairs: chairs,
      status: "available",
      chair_price: chair_price,
    };

    submit({ data: JSON.stringify(payload) }, { method: "post" });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: any) => text,
    },
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
      render: (text: any) => <Tag color="#f50">{text}</Tag>,
    },
    {
      title: "Price / Chair",
      dataIndex: "chair_price",
      key: "chair_price",
      width: 150,
      render: (text: any) => <>{numeral(text).format("0,0.00")}</>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text: any) => <>{numeral(text).format("0,0.00")}</>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: any, record: any) => (
        <Space>
          <Tag
            color={
              text === "pending"
                ? "blue"
                : text === "unavailable"
                ? "grey"
                : "success"
            }
          >
            {text}
          </Tag>
          <Tag color={record.active ? "blue" : "grey"}>
            {record.active ? "Unlock" : "Lock"}
          </Tag>
        </Space>
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
        btnData={
          [
            // <Button onClick={() => setModal(true)}>Add Desk</Button>
          ]
        }
      />
      <CreateDeskModal
        loading={state === "loading" || state === "submitting"}
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

              <Input placeholder="Label" onChange={handleSearch} />

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
