import React, { useContext } from "react";
import {
  Button,
  Col,
  Row,
  Typography,
  Form,
  notification,
  Select,
  Input,
  Spin,
} from "antd";
import {
  Link,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";

import {
  HeaderBar,
  Mention,
  ModalBookingDetails,
  TableSelect,
} from "../../components";
import { IndexPageLayout } from "../../layout";
import { AuthContext } from "../../context/AuthContext";
import * as API from "../../api";
import { BookingForm } from "../../components/BookingForm";

export async function NewBookingSingleLoader({ request, params }: any) {
  try {
    const desk = await API.getDesk(params.id);
    const customers = await API.getCustomers();

    return { desk: desk.data.data, customers: customers.data.data };
  } catch (e: any) {
    return { desk: null, customers: [] };
  }
}

export async function NewBookingSingleAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  try {
    const bookingData = JSON.parse(submitData.data);

    const { data } = await API.createBooking(bookingData);

    return {
      message: "Booking Successfully!",
      status: "success",
      bookingId: data.id,
    };
  } catch (e: any) {
    return { message: "Cannot booking this Seat(s) !", status: "error" };
  }
}

export const NewBookingSingle = () => {
  const { desk, customers } = useLoaderData() as any;

  const [form] = Form.useForm();
  const [summary] = Form.useForm();

  const submit = useSubmit();
  const navigate = useNavigate();
  const action = useActionData() as any;

  const [modal, setModal] = React.useState(false);

  const { onResponse } = useContext(AuthContext);
  const { state } = useNavigation();

  const [selectedSeat, setSelectedSeat] = React.useState<any>([]);
  const [selectedCustomer, setSelectedCustomer] = React.useState<any>({});

  const handleFinishedModal = () => {
    const payload = {
      customer_id: selectedCustomer.id,
      desk_id: desk.id,
      chairs_id: selectedSeat,
    };
    setModal(false);

    submit({ data: JSON.stringify(payload) }, { method: "post" });
  };

  const onFinished = (values: any) => {
    const seatValues = desk.chairs
      .filter((d: any) => selectedSeat.indexOf(d.id) > -1)
      .map((c: any) => c.label);

    form.setFieldsValue({
      ...values,
      customer_id: selectedCustomer.id,
      desk_id: desk.id,
      chairs_id: selectedSeat,
      no: String(seatValues),
      amount: selectedSeat.length,
      unitprice: 350,
      total:
        selectedSeat.length === 10 ? desk.price : selectedSeat.length * 350,
    });

    setModal(true);
  };

  const handleBooking = (mode: string) => {
    if (mode === "all") {
      setSelectedSeat(desk.chairs.map((item: any) => item.id));
    }
  };

  const handleSelectedSeat = (id: any) => {
    let prev = selectedSeat;

    if (prev.indexOf(id) === -1) {
      setSelectedSeat([...selectedSeat, id]);
    } else {
      prev = prev.filter((c: any) => c != id);
      setSelectedSeat(prev);
    }
  };

  const onSelect = (value: any) => {
    if (value) {
      const customer = JSON.parse(value);

      form.setFieldsValue(customer);
      setSelectedCustomer(customer);
    } else {
      form.resetFields();
      setSelectedCustomer({});
    }
  };

  React.useEffect(() => {
    if (action && action.status) {
      onResponse(action.status, action.message);

      if (action.message === "Booking Successfully!") {
        navigate(`/booking/${action.bookingId}`);
      }
    }
    if (selectedSeat.length) {
      summary.setFieldsValue({
        no: String(
          desk.chairs
            .filter((d: any) => selectedSeat.indexOf(d.id) > -1)
            .map((c: any) => c.label)
        ),
        amount: selectedSeat.length,
        unitprice: desk.chair_price,
        total:
          selectedSeat.length === 10 ? desk.price : selectedSeat.length * 350,
      });
    }
  }, [action, selectedSeat]);

  return (
    <IndexPageLayout>
      <HeaderBar
        title="Booking"
        btnData={[
          <Link to="/booking/new">
            <Button>Back</Button>
          </Link>,
        ]}
      />
      <div className="reserv-container">
        <div className="reserv-box">
          <Spin spinning={state === "loading" || state === "submitting"}>
            <Row gutter={20} style={{ minWidth: "95%", minHeight: 664 }}>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={14}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TableSelect
                  desk={desk}
                  selectedSeat={selectedSeat}
                  handleSelectedSeat={handleSelectedSeat}
                />
                <Form
                  form={summary}
                  name="summary"
                  autoComplete="off"
                  colon={false}
                >
                  <div style={{ padding: 30 }}></div>
                  {/* FIXME pho0m fixed padding*/}
                  <Mention selectedSeat={selectedSeat} />
                </Form>
              </Col>
              <Col xs={24} sm={24} md={24} lg={10}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Form
                    form={form}
                    onFinish={onFinished}
                    onFinishFailed={() => {
                      setSelectedSeat([]);
                    }}
                    name="booking"
                    autoComplete="off"
                    colon={false}
                    layout="vertical"
                  >
                    <ModalBookingDetails
                      open={modal}
                      onCancel={() => setModal(false)}
                      handleFinishedModal={handleFinishedModal}
                    />
                    <Typography.Title
                      level={4}
                      style={{
                        marginTop: "10px",
                        marginBottom: "20px",
                      }}
                    >
                      Reserve Detail
                    </Typography.Title>
                    <Select
                      showSearch
                      style={{ width: "100%", marginBottom: "20px" }}
                      placeholder="Select Customer"
                      optionFilterProp="children"
                      onSelect={onSelect}
                      filterOption={(input: string, option: any) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={customers.map((c: any) => ({
                        label: `${c.first_name} ${c.last_name} - ${c.generation}`,
                        value: JSON.stringify(c),
                      }))}
                    />
                    {selectedCustomer && selectedCustomer.id && (
                      <BookingForm
                        desk={desk}
                        selectedSeat={selectedSeat}
                        handleBooking={handleBooking}
                      />
                    )}
                  </Form>
                </div>
              </Col>
            </Row>
          </Spin>
        </div>
      </div>
    </IndexPageLayout>
  );
};
