import React from "react";
import { Outlet, redirect, useLoaderData } from "react-router-dom";

import { AppLayout } from "../layout";

import * as API from "../api";

export async function loader({ request, params }: any) {
  //example
  try {
    const me = await API.getMe();

    return { me: me.data.data };
  } catch (e: any) {
    localStorage.removeItem("token");

    return redirect("/login");
  }
}

export const Root = () => {
  const { me } = useLoaderData() as any;
  console.log({ me });

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};
