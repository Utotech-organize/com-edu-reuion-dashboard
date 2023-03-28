import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./layout";

import { Login, DashboardIndex, Root } from "./pages";
import { UserIndex, UserNew, UserEdit } from "./pages/user";
import {
  ReservationIndex,
  ReservationEdit,
  ReservationPayment,
} from "./pages/reservation";
import { PaymentIndex, PaymentEdit, PaymentSuccess } from "./pages/payment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardIndex />,
      },
      {
        path: "/user",
        element: <UserIndex />,
      },
      {
        path: "/user/new",
        element: <UserNew />,
      },
      {
        path: "/user/:id",
        element: <UserEdit />,
      },
      {
        path: "/reservation",
        element: <ReservationIndex />,
      },
      {
        path: "/reservation/:id",
        element: <ReservationEdit />,
      },
      {
        path: "/reservation/:id/payment",
        element: <ReservationPayment />,
      },

      {
        path: "/payment",
        element: <PaymentIndex />,
      },

      {
        path: "/payment/:id",
        element: <PaymentEdit />,
      },
      {
        path: "/payment/:id/success",
        element: <PaymentSuccess />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
