import { useLoaderData } from "react-router-dom";
import BubbleUI from "react-bubble-ui";
import _ from "lodash";
import * as API from "../api";
import React from "react";
import { Button } from "antd";

export async function SlotRandomloader({ request, params }: any) {
  try {
    return null;
  } catch (e: any) {
    return null;
  }
}

// const getRandomObject = (array: any) => {
//   const randomObject = array[Math.floor(Math.random() * array.length)];
//   return randomObject;
// };

export const SlotRandom = () => {
  const res = useLoaderData();
  const [randomData, setRandomData] = React.useState<any[]>([]);
  console.log({ randomData });
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

  const data = [...Array(200)].map((x) => {
    return {
      image:
        "https://drive.google.com/uc?export=view&id=1X397QtEgZ76TDYBZKaIBce0xKRnnkHD9",
    };
  });

  React.useEffect(() => {
    let intervalId = null as any;

    if (start) {
      intervalId = setInterval(() => {
        setRandomData(() => _.sampleSize(data, 3));
      }, 500);
    }

    return () => clearInterval(intervalId);
  }, [start]);

  console.log({ stop });

  const Child = (data: any) => {
    return (
      <div className="childComponent">
        <img
          src={data.data.image}
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
            <Child data={data} className="child" key={i} />
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
