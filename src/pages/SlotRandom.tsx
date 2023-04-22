import { useLoaderData } from "react-router-dom";
import BubbleUI from "react-bubble-ui";
import _ from "lodash";
import * as API from "../api";
import React from "react";
import { Button, Image } from "antd";
export async function SlotRandomloader({ request, params }: any) {
  try {
    const { data } = await API.getCustomers();

    const result = data.data.filter((d: any) => d.status === "available");

    return { customers: result };
  } catch (e: any) {
    return { customers: [] };
  }
}

export const SlotRandom = () => {
  const { customers } = useLoaderData() as any;
  const [randomData, setRandomData] = React.useState<any[]>([]);
  const [start, setStart] = React.useState(false);

  const options = {
    size: 180,
    minSize: 20,
    gutter: 8,
    provideProps: true,
    numCols: 3,
    fringeWidth: 160,
    yRadius: 130,
    xRadius: 220,
    cornerRadius: 50,
    showGuides: false,
    compact: true,
    gravitation: 5,
  };

  React.useEffect(() => {
    let intervalId = null as any;

    if (start) {
      intervalId = setInterval(() => {
        setRandomData(() => _.sampleSize(customers, 3));
      }, 500);
    }

    return () => clearInterval(intervalId);
  }, [start]);

  const Child = (data: any) => {
    return (
      <div className="childComponent">
        <Image
          src={data.data.line_photo_url}
          alt=""
          style={{
            width: "100%",
            borderRadius: "50%",
          }}
        />
      </div>
    );
  };

  return (
    <div>
      <BubbleUI options={options} className="myBubbleUI">
        {randomData && randomData.length ? (
          randomData.map((data: any, i: any) => (
            <Child data={{ ...data, i }} className="child" key={i} />
          ))
        ) : (
          <></>
        )}
      </BubbleUI>
      <div className="center-abs">
        <Button
          type="primary"
          style={{ width: 300, height: 50 }}
          onClick={() => setStart(!start)}
        >
          Start / Stop
        </Button>
      </div>
    </div>
  );
};
