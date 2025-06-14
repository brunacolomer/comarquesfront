import { View, Dimensions, Keyboard } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import MapCat from "components/MapCat";
import { Button, YStack, Text, Image, XStack, Input } from "tamagui";
import { useState, useEffect } from "react";
import { Polaroid } from "components/Polaroid";
import { AddMenu } from "components/AddMenu";
import { useCanvasGestures } from "components/gestures/useCanvasGestures";
import { SearchHomeBar } from "components/SerachHomeBar";
import { useComarques } from "hooks/useComarques";
import { ComarcaData } from "types/comarques";
import { useSharedValue } from "react-native-reanimated";
import { useDerivedValue } from "react-native-reanimated";
import { withTiming, runOnJS, useAnimatedStyle } from "react-native-reanimated";

const screen = Dimensions.get("window");

export default function InfiniteCanvas() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [comarca, setComarca] = useState<ComarcaData>({});
  const [info, setInfo] = useState("");
  const { comarques, isLoading, error, createFriend } = useComarques();

  const touchPath = (region: string) => {
    setTimeout(() => {
      if (!isPanning.value) {
        Keyboard.dismiss();
        console.log(`Pressed ${region}`);
        setVisible(true);
        setComarca(comarques[region] || {});
        //setInfo(comarques[region] || "No info available");
      }
    }, 100); // Delay to avoid immediate re-render
  };
  useEffect(() => {
    if (info) {
      console.log("Info updated:", info);
    }
  }, [info]);
  const [map, setMap] = useState<"amics" | "reptes">("amics");
  console.log("Map state:", map);
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);

  const switchMap = () => {
    const nextMap = map === "amics" ? "reptes" : "amics";

    // surt el mapa actual cap a l'esquerra
    translateX.value = withTiming(-screen.width, { duration: 300 }, () => {
      runOnJS(setMap)(nextMap);

      // entra el mapa nou des de la dreta
      translateX.value = screen.width;
      translateX.value = withTiming(0, { duration: 300 });
    });
  };
  const { gesture, animatedStyle, isPanning } = useCanvasGestures(switchMap);
  const {
    gesture: gesture2,
    animatedStyle: animatedStyle2,
    isPanning: isPanning2,
  } = useCanvasGestures(switchMap);

  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <>
      <SearchHomeBar />
      {(open || visible) && (
        <YStack
          position="absolute"
          fullscreen
          bg="rgba(0,0,0,0.3)"
          z={1000}
          onPress={() => {
            setOpen(false);
            setVisible(false);
          }}
        />
      )}

      <Polaroid
        visible={visible}
        onClose={() => setVisible(false)}
        content={comarca}
      />
      <AddMenu open={open} setOpen={setOpen} addAmic={createFriend} />
      {map === "amics" ? (
        <GestureDetector gesture={gesture}>
          <View style={{ flex: 1 }}>
            {isLoading ? (
              <YStack flex={1} justify="center" items="center" bg="$background">
                <Text>Carregant mapa...</Text>
                {/* Pots afegir un spinner si vols */}
              </YStack>
            ) : (
              <Animated.View style={[{ flex: 1 }, animatedStyle]}>
                <MapCat onPathPress={touchPath} comarques={comarques} />
              </Animated.View>
            )}
          </View>
        </GestureDetector>
      ) : (
        <GestureDetector gesture={gesture2}>
          <View style={{ flex: 1 }}>
            {isLoading ? (
              <YStack flex={1} justify="center" items="center" bg="$background">
                <Text>Carregant mapa...</Text>
                {/* Pots afegir un spinner si vols */}
              </YStack>
            ) : (
              <Animated.View style={[{ flex: 1 }, animatedStyle2, slideStyle]}>
                <MapCat onPathPress={touchPath} comarques={comarques} />
              </Animated.View>
            )}
          </View>
        </GestureDetector>
      )}
    </>
  );
}
