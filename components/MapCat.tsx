import React from "react";
import Svg, { Path, Polygon, Rect, Line } from "react-native-svg";
import mapDataComarques from "../constants/MapaPathsComarques.json";

const MapCat = ({
  pathColors = {},
  onPathPress = (region: string) => {},
  viewBox = "0 0 800 800",
}) => {
  return (
    <Svg width="100%" height="100%" viewBox={viewBox}>
      {Object.keys(mapDataComarques).map((region) =>
        mapDataComarques[region].d ? (
          <Path
            key={region}
            d={mapDataComarques[region].d}
            fill={pathColors[region] || "white"}
            stroke="black"
            strokeWidth="1"
            onPressIn={() => onPathPress(region)}
          />
        ) : (
          <Polygon
            key={region}
            points={mapDataComarques[region].points}
            fill={pathColors[region] || "white"}
            stroke="black"
            strokeWidth="1"
            onPressIn={() => onPathPress(region)}
          />
        )
      )}

      {/* Rectangles de referència */}
    </Svg>
  );
};

export default MapCat;
