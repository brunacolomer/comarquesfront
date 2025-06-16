import Svg, { Path, Polygon, Rect, Line } from "react-native-svg";
import mapDataComarques from "../constants/MapaPathsComarques.json";

type InfoComarca = {
  descripcio_repte: string | null;
  assolit: boolean;
  foto: string | null;
  data: string | null;
  descripcio_assolit: string | null;
};

type ComarcaData = {
  d?: string; // si és un Path
  points?: string; // si és un Polygon
  viewBox?: string;
  info?: InfoComarca; // potser vols posar un tipus més específic si saps la forma de la resposta del backend
};

type ComarquesMap = {
  [region: string]: ComarcaData;
};
type MapCatProps = {
  pathColors?: { [region: string]: string };
  onPathPress?: (region: string) => void;
  viewBox?: string;
  comarques: ComarquesMap;
};
const MapCat = ({
  pathColors = {},
  onPathPress = (region: string) => {},
  viewBox = "0 0 800 800",
  comarques = {},
}: MapCatProps) => {
  return (
    <Svg width="100%" height="100%" viewBox={viewBox}>
      {Object.entries(comarques).map(([region, data]) => {
        const friends = data.info?.foto ? 1 : 0; // Aquí pots ajustar la lògica per obtenir el nombre d'amics
        const filling = friends
          ? `rgba(198, 125, 69, ${friends * 0.5})`
          : "none";

        return comarques[region].d ? (
          <Path
            key={region}
            d={data.d}
            fill={filling}
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
            fill={filling}
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
