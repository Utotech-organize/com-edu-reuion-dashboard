import {
  useFetcher,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import BubbleUI from "react-bubble-ui";

import * as API from "../api";
import React, { useTransition } from "react";
import { Spin } from "antd";

export async function GalleryLoader({ request, params }: any) {
  try {
    const { data } = await API.getCustomers();

    const result = data.data.filter((d: any) => d.status === "available");

    return { customers: result };
  } catch (e: any) {
    return { customers: [] };
  }
}

export const GalleryPage = () => {
  const { customers } = useLoaderData() as any;
  const { state } = useNavigation();

  const submit = useSubmit();

  const options = {
    size: 100,
    minSize: 20,
    gutter: 4,
    provideProps: true,
    numCols: 12,
    fringeWidth: 160,
    yRadius: 200,
    xRadius: 500,
    cornerRadius: 0,
    showGuides: false,
    compact: true,
    gravitation: 5,
  };

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      submit({}, { method: "get" });
    }, 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const Child = (data: any) => {
    return (
      <div className="childComponent">
        <img
          src={data.data.line_photo_url}
          alt=""
          style={{
            width: "100%",
            borderRadius: "50%",
          }}
        ></img>
      </div>
    );
  };

  return (
    <Spin spinning={state === "loading" || state === "submitting"}>
      <BubbleUI options={options} className="myBubbleUI">
        {customers.map((data: any, i: any) => (
          <Child data={data} className="child" key={i} />
        ))}
      </BubbleUI>
    </Spin>
  );
};
