import React from "react";
import { Avatar, Button, Card, Col, Row, Skeleton } from "antd";
import { useLoaderData, useNavigation, useSubmit } from "react-router-dom";

import { CreateDeskModal, HeaderBar } from "../components";
import { IndexPageLayout } from "../layout";
import * as API from "../api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import numeral from "numeral";
import { UpdateProduct } from "../components/UpdateProduct";

export async function productLoader({ request, params }: any) {
  try {
    const products = await API.getProducts();

    return { products: products.data.data };
  } catch (e: any) {
    return { products: [] };
  }
}

export async function productACtion({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  switch (request.method) {
    case "POST":
      try {
        const { data } = await API.createProduct(submitData);

        return {
          message: "Create Successfully!",
          status: "success",
        };
      } catch (e: any) {
        return { message: "Cannot create this Product!", status: "error" };
      }
    case "PUT":
      try {
        const { data } = await API.updateProduct(params.id, submitData);

        return {
          message: "Update Successfully!",
          status: "success",
        };
      } catch (e: any) {
        return { message: "Cannot update this Product!", status: "error" };
      }

    case "DELETE":
      try {
        const { data } = await API.deleteUser(params.id);

        return {
          message: "Delete Successfully!",
          status: "success",
        };
      } catch (e: any) {
        return { message: "Cannot delete this Product!", status: "error" };
      }
  }
}

export const ProductPage = () => {
  const { products } = useLoaderData() as any;
  const [modal, setModal] = React.useState<boolean>(false);
  const submit = useSubmit();
  const { state } = useNavigation();

  const [selectedProduct, setSelectedProduct] = React.useState<any>({});
  console.log({ products });

  const productsA = [
    {
      id: 1,
      label: "soda update",
      price: 100,
      ordering: 1,
      remark: "this is soda sing",
      active: false,
    },
    {
      id: 2,
      label: "soda update",
      price: 100,
      ordering: 1,
      remark: "this is soda sing ddsfsdfdfsdfsdf sfsdsd",
      active: false,
    },
    {
      id: 3,
      label: "soda update",
      price: 100,
      ordering: 1,
      remark: "this is soda sing",
      active: false,
    },
    {
      id: 4,
      label: "soda update",
      price: 100,
      ordering: 1,
      remark: "this is soda sing",
      active: false,
    },
    {
      id: 5,
      label: "soda update",
      price: 100,
      ordering: 1,
      remark: "this is soda sing",
      active: false,
    },
    {
      id: 6,
      label: "soda update",
      price: 100,
      ordering: 1,
      remark: "this is soda sing",
      active: false,
    },
  ];

  const handleFinishedModal = (values: any) => {
    //  submit({ data: JSON.stringify(payload) }, { method: "post" });
    console.log({ values });
  };

  const onEdit = (data: any) => {
    console.log({ data });
    setSelectedProduct(data);
    setModal(true);
  };

  const onDelete = (data: any) => {
    console.log({ data });
  };

  const onClose = () => {
    setModal(false);
    setSelectedProduct({});
  };

  return (
    <IndexPageLayout>
      <HeaderBar
        title="Product Management"
        btnData={[<Button onClick={() => setModal(true)}>Add Product</Button>]}
      />
      <UpdateProduct
        data={selectedProduct}
        loading={state === "loading" || state === "submitting"}
        open={modal}
        onCancel={onClose}
        handleFinishedModal={handleFinishedModal}
      />
      <div
        style={{
          height: "100%",
          padding: "0px 40px 20px 40px",
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        <Row gutter={[16, 16]}>
          {productsA.map((data: any) => (
            <Col xs={24} sm={12} md={8} lg={6} key={data.id}>
              <Skeleton
                loading={state === "loading" || state === "submitting"}
                avatar
                active
              >
                <Card
                  hoverable
                  style={{ padding: 12 }}
                  actions={[
                    <EditOutlined key="edit" onClick={(e) => onEdit(data)} />,
                    <DeleteOutlined
                      key="delete"
                      onClick={(e) => onDelete(data.id)}
                    />,
                  ]}
                  cover={
                    <img
                      alt="example"
                      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                    />
                  }
                  bodyStyle={{ height: 150, padding: 0 }}
                >
                  <Meta title={data.label} description={data.remark} />
                  <h4
                    style={{ marginTop: 12, marginBottom: 0, textAlign: "end" }}
                  >
                    {numeral(data.price).format("0,0.00")} Bath
                  </h4>
                </Card>
              </Skeleton>
            </Col>
          ))}
        </Row>
      </div>
    </IndexPageLayout>
  );
};
