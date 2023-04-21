import React from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Row,
  Skeleton,
  Form,
  Empty,
  Modal,
  Space,
  Badge,
} from "antd";
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
  const form = JSON.parse(submitData.data);

  switch (request.method) {
    case "POST":
      try {
        const { data } = await API.createProduct(form);

        return {
          message: "Create Successfully!",
          status: "success",
        };
      } catch (e: any) {
        return { message: "Cannot create this Product!", status: "error" };
      }
    case "PUT":
      try {
        const { data } = await API.updateProduct(form.id, form);

        return {
          message: "Update Successfully!",
          status: "success",
        };
      } catch (e: any) {
        return { message: "Cannot update this Product!", status: "error" };
      }

    case "DELETE":
      try {
        const { data } = await API.deleteProduct(form.id);

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
  const [form] = Form.useForm();

  const [selectedProduct, setSelectedProduct] = React.useState<any>({});

  const handleFinishedModal = (values: any) => {
    const { fileList, ...value } = values;

    const payload = {
      ...value,
      image: fileList?.length
        ? fileList[0].url
        : fileList && fileList.file
        ? fileList.file
        : "",
      active: value?.active ? true : false,
    };

    if (selectedProduct.id) {
      payload.id = selectedProduct.id;
    }
    setModal(false);

    submit(
      { data: JSON.stringify(payload) },
      { method: selectedProduct.id ? "put" : "post" }
    );
  };

  const onEdit = (data: any) => {
    setSelectedProduct(data);
    setModal(true);
  };

  const onDelete = (id: any) => {
    Modal.confirm({
      title: "Warning !",
      content: (
        <div>
          <p>Are you sure to Delete this Product?</p>
        </div>
      ),
      okText: "Confirm",

      onOk() {
        submit({ data: JSON.stringify({ id: id }) }, { method: "delete" });
      },
      cancelText: "Cancel",
      onCancel() {},
    });
  };

  const onClose = () => {
    setModal(false);
    setSelectedProduct({});
    form.resetFields();
  };

  React.useEffect(() => {
    form.setFieldsValue({
      ...selectedProduct,
      fileList:
        selectedProduct && selectedProduct.image
          ? [{ uid: "-1", url: selectedProduct.image }]
          : [],
    });
  }, [selectedProduct]);

  return (
    <IndexPageLayout>
      <HeaderBar
        title="Product Management"
        btnData={[<Button onClick={() => setModal(true)}>Add Product</Button>]}
      />
      {modal && (
        <UpdateProduct
          open={modal}
          form={form}
          data={selectedProduct}
          loading={state === "loading" || state === "submitting"}
          onCancel={onClose}
          handleFinishedModal={handleFinishedModal}
        />
      )}

      <div
        style={{
          height: "100%",
          padding: "0px 40px 20px 40px",
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        <Row gutter={[16, 16]}>
          {products.map((data: any) => (
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
                    data.image ? (
                      <img alt={`product-${data.id}`} src={data.image} />
                    ) : (
                      <div style={{ height: "200px", background: "gray" }} />
                    )
                  }
                  bodyStyle={{ height: 150, padding: 4 }}
                >
                  <Meta
                    title={
                      <Space>
                        {data.label}
                        <Badge color={data.active ? "green" : "red"} />
                      </Space>
                    }
                    description={data.remark}
                  />
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
