// useCanvasGestures.ts
import { Dimensions, Keyboard } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";

const screen = Dimensions.get("window");

export function useCanvasGestures(onSwipe: () => void) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const startScale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const isPanning = useSharedValue(false);
  const logSwipe = () => {
    console.log("👈 Has fet un flick ràpid cap a l'esquerra a baix!");
    onSwipe();
  };
  const dismissKeyboard = () => {
    console.log("Dismissing keyboard");
    Keyboard.dismiss();
  };

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
      translateX.value = translateX.value - dx * (zoom / scale.value - 1);
      translateY.value = translateY.value - dy * (zoom / scale.value - 1);
      scale.value = zoom;
    });

  const panGesture = Gesture.Pan()
    .onStart((e) => {
      runOnJS(dismissKeyboard)();
      isPanning.value = true;
    })
    .onChange((e) => {
      translateX.value += e.changeX;
      translateY.value += e.changeY;
    })
    .onEnd((e) => {
      isPanning.value = false;

      const isInBottomLeft = e.absoluteY > screen.height * 0.7;

      const isFastLeftSwipe = e.velocityX < -800;

      if (isInBottomLeft && isFastLeftSwipe) {
        runOnJS(logSwipe)();
      }
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onBegin(() => {
      runOnJS(dismissKeyboard)();
    })
    .onEnd(() => {
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

  return {
    gesture,
    animatedStyle,
    isPanning,
  };
}
