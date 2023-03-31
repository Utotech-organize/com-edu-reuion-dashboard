import { createBrowserRouter } from "react-router-dom";

import { Login, DashboardIndex, Root } from "./pages";
import { UserIndex, UserNew, UserEdit } from "./pages/user";
import {
  ReservationIndex,
  ReservationEdit,
  ReservationPayment,
} from "./pages/reservation";
import { PaymentIndex, PaymentEdit, PaymentSuccess } from "./pages/payment";

import { loader as rootLoader } from "./pages/root";

import { action as loginAction } from "./pages/login";

import { action as newUserAction } from "./pages/user/new";
import { loader as userEditLoader } from "./pages/user/edit";
import { loader as userIndexLoader } from "./pages/user/index-page";

export const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    loader: rootLoader,
    element: <Root />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardIndex />,
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
    action: loginAction,
    element: <Login />,
  },
]);
