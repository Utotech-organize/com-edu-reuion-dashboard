import { Outlet } from "react-router-dom";
import { AppLayout } from "../layout";
export const Root = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};
