import { useLoaderData } from "react-router-dom";
import BubbleUI from "react-bubble-ui";

import * as API from "../api";

export async function GalleryLoader({ request, params }: any) {
  try {
    return null;
  } catch (e: any) {
    return null;
  }
}

export const GalleryPage = () => {
  const res = useLoaderData();

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
        ></img>
      </div>
    );
  };

  return (
    <div>
      <BubbleUI options={options} className="myBubbleUI">
        {[...Array(200)]
          .map((x) => {
            return {
              image:
                "https://drive.google.com/uc?export=view&id=1X397QtEgZ76TDYBZKaIBce0xKRnnkHD9",
            };
          })
          .map((data: any, i: any) => (
            <Child data={data} className="child" key={i} />
          ))}
      </BubbleUI>
    </div>
  );
};
