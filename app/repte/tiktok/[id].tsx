import { YStack, Text, ButtonIcon, XStack, ScrollView } from "tamagui";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import Svg, { Path, Polygon } from "react-native-svg";
import MapaPathsComarques from "../../../constants/MapaPathsComarques.json";
export default function MoreReptes() {
  const { id } = useLocalSearchParams();
  const mapes = Array.from({ length: 20 }, (_, i) => i); // o el que vulguis

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <YStack flex={1} p={20}>
        <XStack mt={30}>
          <Svg width={150} height={150} viewBox="0 0 800 800">
            {Object.entries(MapaPathsComarques).map(([region, data]) => {
              const friends = 0; // Aquí pots ajustar la lògica per obtenir el nombre d'amics
              const filling = friends
                ? `rgba(198, 125, 69, ${friends * 0.5})`
                : "none";

              return MapaPathsComarques[region].d ? (
                <Path
                  key={region}
                  d={data.d}
                  fill={filling}
                  stroke="black"
                  strokeWidth="1"
                />
              ) : (
                <Polygon
                  key={region}
                  points={MapaPathsComarques[region].points}
                  fill={filling}
                  stroke="black"
                  strokeWidth="1"
                />
              );
            })}
          </Svg>
          <YStack>
            <Text maxW={195} m={5} fontWeight={800} fontSize={24}>
              Menjar una galeta a cada comarca
            </Text>
            <Text mt={5}> @gatetmonissim</Text>
          </YStack>
        </XStack>
        <YStack mt={20}>
          {mapes.map((_, i) => {
            if (i % 3 !== 0) return null; // només volem començar nova fila cada 3

            return (
              <XStack key={i} gap="$2">
                {[0, 1, 2].map((offset) => {
                  const index = i + offset;
                  if (index >= mapes.length) return null;
                  return (
                    <YStack items="center">
                      <Mapa key={index} />
                      <Text fontWeight={100} fontSize={10} mb={10}>
                        @usuari
                      </Text>
                    </YStack>
                  );
                })}
              </XStack>
            );
          })}
        </YStack>
      </YStack>
    </ScrollView>
  );
}

const Mapa = () => {
  return (
    <Svg width={120} height={120} viewBox="0 0 800 800">
      {Object.entries(MapaPathsComarques).map(([region, data]) => {
        const friends = 0; // Aquí pots ajustar la lògica per obtenir el nombre d'amics
        const filling = friends
          ? `rgba(198, 125, 69, ${friends * 0.5})`
          : "none";

        return MapaPathsComarques[region].d ? (
          <Path
            key={region}
            d={data.d}
            fill={filling}
            stroke="black"
            strokeWidth="1"
          />
        ) : (
          <Polygon
            key={region}
            points={MapaPathsComarques[region].points}
            fill={filling}
            stroke="black"
            strokeWidth="1"
          />
        );
      })}
    </Svg>
  );
};
