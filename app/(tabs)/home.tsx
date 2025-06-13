import { View, Dimensions, Keyboard } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import MapCat from "components/MapCat";
import { Button, YStack, Text, Image, XStack, Input } from "tamagui";
import { useState, useEffect } from "react";
import { getComarques } from "services/comarques";
import { useSession } from "auth/ctx";
import { Polaroid } from "components/Polaroid";
import { AddMenu } from "components/AddMenu";
import { useCanvasGestures } from "components/gestures/useCanvasGestures";
import { SearchHomeBar } from "components/SerachHomeBar";
import { useComarques } from "hooks/useComarques";
import { ComarcaData } from "types/comarques";
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

  const { gesture, animatedStyle, isPanning } = useCanvasGestures();
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
    </>
  );
}
