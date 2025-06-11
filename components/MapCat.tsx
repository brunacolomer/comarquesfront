import React, { useEffect, useState } from "react";
import Svg, { Path, Polygon, Rect, Line } from "react-native-svg";
import mapDataComarques from "../constants/MapaPathsComarques.json";
import { getComarques } from "../services/comarques";
import { useSession } from "../auth/ctx";
import { Polaroid } from "./Polaroid";

const MapCat = ({
  pathColors = {},
  onPathPress = (region: string) => {},
  viewBox = "0 0 800 800",
}) => {
  const { session } = useSession();
  const [comarques, setComarques] = useState([]);
  useEffect(() => {
    if (session) {
      getComarques(session).then(setComarques).catch(console.error);
    }
  }, [session]);

  return (
    <Svg width="100%" height="100%" viewBox={viewBox}>
      {Object.keys(mapDataComarques).map((region) => {
        const comi = "hola";
        const existeix = Object.keys(comarques).some(
          (nomComarca) => nomComarca.toLowerCase() === region.toLowerCase()
        );

        const filling = existeix ? "red" : "none";

        return mapDataComarques[region].d ? (
          <Path
            key={region}
            d={mapDataComarques[region].d}
            fill={pathColors[region] || filling}
            stroke="black"
            strokeWidth="1"
            onPressIn={() => {
              onPathPress(region);
            }}
          />
        ) : (
          <Polygon
            key={region}
            points={mapDataComarques[region].points}
            fill={pathColors[region] || filling}
            stroke="black"
            strokeWidth="1"
            onPressIn={() => onPathPress(region)}
          />
        );
      })}
    </Svg>
  );
};

export default MapCat;
