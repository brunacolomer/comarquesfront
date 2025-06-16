import { YStack, Text, Button } from "tamagui";
import { useLocalSearchParams } from "expo-router";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { useCanvasGestures } from "components/gestures/useCanvasGestures";
import MapCatRepte from "components/MapCatRepte";
import { useRepte } from "hooks/useRepte";
import { useState } from "react";
import { PolaroidRepte } from "components/PolaroidRepte";
import { router } from "expo-router";
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
export default function ReptePage() {
  const { id } = useLocalSearchParams();
  const numbid = parseInt(id as string, 10);
  const [visible, setVisible] = useState(false);
  const { ComarquesMap, loading, error, capçalera } = useRepte({ id: numbid });
  const [comarca, setComarca] = useState<ComarcaData>({});
  const { gesture, animatedStyle, isPanning } = useCanvasGestures(() => {
    // Handle the gesture end, if needed
    console.log("Gesture ended");
  });

  const touchPath = (region: string) => {
    setTimeout(() => {
      if (!isPanning.value) {
        console.log(`Pressed ${region}`);
        setVisible(true);
        setComarca(ComarquesMap[region] || {});
        //setInfo(comarques[region] || "No info available");
      }
    }, 100); // Delay to avoid immediate re-render
  };

  return (
    <YStack flex={1} bg="white" p={40}>
      <Text>Repte ID: {id}</Text>
      <Text fontSize={24} fontWeight="bold" mb={20}>
        {capçalera?.titol}
      </Text>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[{ flex: 1 }, animatedStyle]}>
          <MapCatRepte onPathPress={touchPath} comarques={ComarquesMap} />
        </Animated.View>
      </GestureDetector>

      <Button
        onPress={() => {
          console.log("suu");
          router.replace(`/repte/tiktok/${id}`);
        }}
        icon={<Text>🔍</Text>}
      />
      <PolaroidRepte
        visible={visible}
        onClose={() => setVisible(false)}
        content={comarca}
      />
    </YStack>
  );
}
