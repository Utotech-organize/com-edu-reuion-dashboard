import React from "react";
import { Outlet, redirect, useLoaderData } from "react-router-dom";

import { AppLayout } from "../layout";

import * as API from "../api";

export async function loader({ request, params }: any) {
  try {
    const me = await API.getMe();

    return { me: me.data };
  } catch (e: any) {
    // return redirect("/login");

    localStorage.removeItem("token");

    return { me: null };
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
