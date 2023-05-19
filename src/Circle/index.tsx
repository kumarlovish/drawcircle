/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";

const RADIUS = 50;
interface circleProperties {
  top: number;
  left: number;
  bottom: number;
  right: number;
  background: string;
}

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const Circle = () => {

  const [circleProperties, setCircleProperties] = useState<circleProperties[]>([
    {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      background: "",
    },
  ]);
  useEffect(() => {
    document.addEventListener("click", drawCircle);

    () => document.removeEventListener("click", drawCircle);
  }, []);

  const drawCircle = (e: any) => {
    const { clientX, clientY } = e;
    const newCircleProperties = {
      top: clientY - RADIUS,
      left: clientX - RADIUS,
      bottom: clientY - RADIUS + 2 * RADIUS,
      right: clientX - RADIUS + 2 * RADIUS,
      background: "red",
    };
    setCircleProperties((preState) => {
      for (let i = 0; i < preState.length; i++) {
        const collision = detectOverLap(newCircleProperties, preState[i]);
        if (collision) {
          newCircleProperties.background = getRandomColor();
          break;
        }
      }
      return [...preState, newCircleProperties];
    });

    const detectOverLap = (
      circle1: circleProperties,
      circle2: circleProperties
    ) => {
      if (
        !(
          circle1.top > circle2.bottom ||
          circle1.right < circle2.left ||
          circle1.bottom < circle2.top ||
          circle1.left > circle2.right
        )
      ) {
        return true;
      }
    };
  };
  return (
    <>
      {circleProperties?.map((val) => {
        return (
          <DrawMyCircle
            top={val.top}
            left={val.left}
            background={val.background}
          />
        );
      })}
    </>
  );
};

const DrawMyCircle = ({
  top,
  left,
  background,
}: {
  top: number;
  left: number;
  background: string;
}) => {
  return (
    <div
      style={{
        position: "absolute",
        width: 2 * RADIUS,
        height: 2 * RADIUS,
        borderRadius: "50%",
        top: top,
        left: left,
        background: background,
      }}
    ></div>
  );
};

export default Circle;
