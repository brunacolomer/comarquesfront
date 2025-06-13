import { YStack, Text, Button, Image } from "tamagui";
import { ComarcaData } from "../types/comarques";
import FlipCard from "react-native-flip-card";
import { Dimensions, View, Pressable } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";

const screen = Dimensions.get("window");
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export const Polaroid = ({
  visible,
  onClose,
  info,
  content,
}: {
  visible: boolean;
  onClose: () => void;
  info?: any;
  content: ComarcaData;
}) => {
  const items = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    front: `Amic ${i + 1}`,
    back: `Descripció ${i + 1}`,
  }));
  return (
    <>
      {visible && (
        <YStack z={2000} position="absolute" fullscreen>
          <Carousel
            width={screen.width}
            data={items}
            loop
            autoPlay={false}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 1,
              parallaxScrollingOffset: 200,
              parallaxAdjacentItemScale: 0.6,
            }}
            renderItem={({ item }) => (
              <Card
                visible={visible}
                onClose={onClose}
                info={info}
                content={content}
              />
            )}
          />
        </YStack>
      )}
    </>
  );
};

export const Card = ({
  visible,
  onClose,
  info,
  content,
}: {
  visible: boolean;
  onClose: () => void;
  info?: any;
  content: ComarcaData;
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
    <>
      {visible && (
        <>
          <AnimatedPressable
            style={[
              {
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: 1001,
              },
              frontStyle,
            ]}
            onPress={onClose}
          >
            <YStack
              bg="white"
              p="$4"
              t={250}
              gap="$4"
              l={screen.width * 0.125}
              width={screen.width * 0.75}
              z={1001}
              position="absolute"
              items="center"
              onPress={flipCard}
            >
              {content.info != undefined ? (
                <>
                  <Image
                    source={{
                      uri:
                        content?.info.amics[0].foto ||
                        "https://i.pinimg.com/736x/d9/35/ee/d935eee014980f34692e8a4a7382aaf9.jpg",
                    }}
                    width="100%"
                    aspectRatio={1}
                  />
                  <Text color="black">
                    {content?.info.amics[0].username || "Desconegut"}
                  </Text>
                  <Text color="black">
                    {content?.info.amics[0].descripcio || "Sense descripció"}
                  </Text>
                </>
              ) : (
                <Text color="black">
                  Encara no tens cap amic en aquesta comarca, surt del cau i ves
                  a conèixer algú
                </Text>
              )}
            </YStack>
          </AnimatedPressable>
          <AnimatedPressable
            style={[
              {
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: 1001,
              },
              backStyle,
            ]}
            onPress={onClose}
          >
            <YStack
              bg="white"
              p="$4"
              t={250}
              gap="$4"
              l={screen.width * 0.125}
              width={screen.width * 0.75}
              height={400}
              z={1001}
              position="absolute"
              items="center"
              onPress={flipCard}
            >
              {content.info != undefined ? (
                <>
                  <Text color="black">
                    {content?.info.amics[0].username || "Desconegut"}
                  </Text>
                  <Text color="black">
                    {content?.info.amics[0].descripcio || "Sense descripció"}
                  </Text>
                </>
              ) : (
                <Text color="black">
                  Encara no tens cap amic en aquesta comarca, surt del cau i ves
                  a conèixer algú
                </Text>
              )}
            </YStack>
          </AnimatedPressable>
        </>
      )}
    </>
  );
};
