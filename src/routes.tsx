import { createBrowserRouter } from "react-router-dom";

import { Login, DashboardIndex, Root } from "./pages";
import { RootLoader } from "./pages/root";
import { loader as LoginAction } from "./pages/login";

import { UserIndex, UserNew, UserEdit } from "./pages/user";
import {
  userIndexLoader,
  userEditLoader,
  newUserAction,
  editUserAction,
} from "./pages/user";

import {
  CustomerEdit,
  CustomerIndex,
  CustomerNew,
  customerEditAction,
} from "./pages/customer";
import {
  customerIndexLoader,
  customerEditLoader,
  newCustomerAction,
} from "./pages/customer";

import {
  BookingIndex,
  NewBooking,
  NewBookingSingle,
  ReservationPayment,
} from "./pages/reservation";
import {
  BookingIndexLoader,
  NewBookingLoader,
  NewBookingSingleLoader,
  NewBookingSingleAction,
  reservationPaymentLoader,
  reservationPaymentAction,
} from "./pages/reservation";

import { PaymentIndex, PaymentEdit, PaymentSuccess } from "./pages/payment";

import { paymentIndexLoader, paymentSuccessLoader } from "./pages/payment";

import { deskIndexAction, deskIndexLoader, editDeskLoader } from "./pages/desk";
import { DeskIndex, EditDesk } from "./pages/desk";

export const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    loader: RootLoader,
    element: <Root />,
    children: [
      {
        path: "/analytic",
        element: <DashboardIndex />,
      },
      {
        path: "/desk",
        loader: deskIndexLoader,
        action: deskIndexAction,
        element: <DeskIndex />,
      },
      {
        path: "/desk/new",
        action: newUserAction,
        element: <UserNew />,
      },
      {
        path: "/desk/:id",
        loader: editDeskLoader,
        element: <EditDesk />,
      },
      {
        path: "/user",
        loader: userIndexLoader,
        element: <UserIndex />,
      },
      {
        path: "/user/new",
        action: newUserAction,
        element: <UserNew />,
      },
      {
        path: "/user/:id",
        loader: userEditLoader,
        action: editUserAction,
        element: <UserEdit />,
      },
      {
        path: "/customer",
        loader: customerIndexLoader,
        element: <CustomerIndex />,
      },
      {
        path: "/customer/new",
        action: newCustomerAction,
        element: <CustomerNew />,
      },
      {
        path: "/customer/:id",
        loader: customerEditLoader,
        action: customerEditAction,
        element: <CustomerEdit />,
      },
      {
        path: "/booking",
        loader: BookingIndexLoader,
        element: <BookingIndex />,
      },
      {
        path: "/booking/new",
        loader: NewBookingLoader,
        element: <NewBooking />,
      },
      {
        path: "/booking/new/:id",
        loader: NewBookingSingleLoader,
        action: NewBookingSingleAction,
        element: <NewBookingSingle />,
      },
      {
        path: "/booking/:id",
        loader: reservationPaymentLoader,
        action: reservationPaymentAction,
        element: <ReservationPayment />,
      },

      {
        path: "/payment",
        loader: paymentIndexLoader,
        element: <PaymentIndex />,
      },

      {
        path: "/payment/:id",
        loader: paymentSuccessLoader,
        element: <PaymentSuccess />,
      },
    ],
  },
  {
    path: "/login",
    action: LoginAction,
    element: <Login />,
  },
]);
