import { Text, View } from "tamagui";
import MapCat from "../../components/MapCat";
import Pathy from "components/Path";
import SvgPanZoom, { SvgPanZoomElement } from "react-native-svg-pan-zoom";
import Svg from "react-native-svg";
import ImageZoom from "react-native-image-pan-zoom";
import { Image } from "react-native";
import { Animated } from "react-native";
import { PanResponder } from "react-native";
import React, { useRef } from "react";
import { Dimensions } from "react-native";
const screen = Dimensions.get("window");
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Circle from "react-native-svg";

export default function TabTwoScreen() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const startScale = useSharedValue(1);

  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const isPanning = useSharedValue(false);

  const pinchGesture = Gesture.Pinch()
    .onStart((e) => {
      startScale.value = scale.value;
      focalX.value = e.focalX;
      focalY.value = e.focalY;
    })
    .onUpdate((e) => {
      const zoom = startScale.value * e.scale;
      const dx = focalX.value - screen.width / 2;
      const dy = focalY.value - screen.height / 2;

      // Compensa perquè sembli que el zoom és al punt del pinch
      translateX.value = translateX.value - dx * (zoom / scale.value - 1);
      translateY.value = translateY.value - dy * (zoom / scale.value - 1);

      scale.value = zoom;
    });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      isPanning.value = true;
    })
    .onChange((e) => {
      translateX.value += e.changeX;
      translateY.value += e.changeY;
    })
    .onEnd(() => {
      isPanning.value = false;
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      // Reset transform
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
      scale.value = withTiming(1);
    });

  const gesture = Gesture.Simultaneous(
    panGesture,
    pinchGesture,
    doubleTapGesture
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <View style={{ flex: 1 }}>
        <Animated.View style={[{ flex: 1 }, animatedStyle]}>
          <Svg width={screen.width} height={screen.height}>
            <Circle
              cx="100"
              cy="100"
              r="60"
              fill="blue"
              onPressIn={() => {
                setTimeout(() => {
                  if (!isPanning.value) {
                    console.log("Cercle clicat");
                  }
                }, 150); // un petit delay per evitar falsos positius
              }}
            />
          </Svg>
          <MapCat />
        </Animated.View>
      </View>
    </GestureDetector>
  );
}
