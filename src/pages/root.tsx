import { Outlet, redirect, useNavigation } from "react-router-dom";
import { Spin, notification } from "antd";

import { AppLayout } from "../layout";
import { AuthContext } from "../context/AuthContext";
import * as API from "../api";

type NotificationType = "success" | "info" | "warning" | "error";

export async function RootLoader() {
  try {
    const me = await API.getMe();

    return { me: me.data.data };
  } catch (e: any) {
    return redirect("/login");
  }
}

export const Root = () => {
  const { state } = useNavigation();

  const onResponse = (status: NotificationType, message: string) => {
    notification[status]({
      message: message,
      placement: "bottomLeft",
      duration: 5,
    });
  };

  return (
    <AuthContext.Provider value={{ onResponse }}>
      <AppLayout>
        <Spin spinning={state === "loading" || state === "submitting"}>
          <Outlet />
        </Spin>
      </AppLayout>
    </AuthContext.Provider>
  );
};
