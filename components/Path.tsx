import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function Pathy() {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 100 100">
      <Path
        d="M 10 10 L 90 10 L 90 90 L 10 90 Z"
        fill="white"
        stroke="black"
        strokeWidth="1"
        onPressIn={() => console.log("Pressed square")}
      />
    </Svg>
  );
}
