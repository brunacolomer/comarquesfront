import { View, Dimensions } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import MapCat from "components/MapCat";

const screen = Dimensions.get("window");

export default function InfiniteCanvas() {
  const touchPath = (region: string) => {
    setTimeout(() => {
      if (!isPanning.value) {
        console.log(`Pressed ${region}`);
      }
    }, 100); // Delay to avoid immediate re-render
  };
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
          <MapCat onPathPress={touchPath} />
        </Animated.View>
      </View>
    </GestureDetector>
  );
}
