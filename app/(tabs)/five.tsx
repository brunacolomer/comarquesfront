import React from "react";
import { Dimensions, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { YStack, Text, Button } from "tamagui";
import Carousel from "react-native-reanimated-carousel";

const screen = Dimensions.get("window");
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const FlipCard = ({
  frontText,
  backText,
}: {
  frontText: string;
  backText: string;
}) => {
  const rotation = useSharedValue(0);

  const flipCard = () => {
    rotation.value = withTiming(rotation.value === 0 ? 180 : 0, {
      duration: 500,
    });
  };

  const frontStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotation.value}deg` }],
      backfaceVisibility: "hidden",
    };
  });

  const backStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotation.value + 180}deg` }],
      backfaceVisibility: "hidden",
      position: "absolute",
      top: 0,
    };
  });

  return (
    <YStack
      width={screen.width * 0.75}
      height={300}
      position="relative"
      overflow="hidden"
    >
      <AnimatedPressable
        style={[
          { width: "100%", height: "100%", position: "absolute" },
          frontStyle,
        ]}
        onPress={flipCard}
      >
        <YStack flex={1} bg="white" items="center" justify="center">
          <Text>{frontText}</Text>
        </YStack>
      </AnimatedPressable>

      <AnimatedPressable
        style={[
          { width: "100%", height: "100%", position: "absolute" },
          backStyle,
        ]}
        onPress={flipCard}
      >
        <YStack flex={1} bg="red" items="center" justify="center">
          <Text>{backText}</Text>
          <Button mt="$2" onPress={flipCard}>
            Tanca
          </Button>
        </YStack>
      </AnimatedPressable>
    </YStack>
  );
};

export default function CarouselWithFlipCards() {
  const items = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    front: `Amic ${i + 1}`,
    back: `Descripció ${i + 1}`,
  }));

  return (
    <Carousel
      width={screen.width * 0.8}
      height={320}
      data={items}
      loop
      autoPlay={false}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 50,
      }}
      renderItem={({ item }) => (
        <FlipCard key={item.id} frontText={item.front} backText={item.back} />
      )}
    />
  );
}
