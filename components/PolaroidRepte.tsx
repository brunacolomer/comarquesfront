import { YStack, Text, Button, Image } from "tamagui";
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

export type Repte = {
  assolit: boolean;
  data: string; // o Date si després la parses
  descripcio_assolit: string;
  descripcio_repte: string;
  foto: string;
  nom: string;
};

export type ComarcaData = {
  d?: string;
  points?: string;
  viewBox?: string;
  info?: Repte;
};

export type ComarquesMap = {
  [region: string]: ComarcaData;
};

const screen = Dimensions.get("window");
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export const PolaroidRepte = ({
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
  return (
    <Card
      visible={visible}
      onClose={onClose}
      foto={
        content.info?.foto ||
        "https://i.pinimg.com/736x/d9/35/ee/d935eee014980f34692e8a4a7382aaf9.jpg"
      }
      descripcio={content.info?.descripcio_repte || null}
      assolit={content.info?.descripcio_assolit || null}
    ></Card>
  );
};

export const Card = ({
  visible,
  onClose,
  foto,
  descripcio,
  assolit,
}: {
  visible: boolean;
  onClose: () => void;
  info?: any;
  foto: string;
  descripcio: string | null;
  assolit: string | null;
}) => {
  const rotation = useSharedValue(0);
  console.log("fototototo", foto);
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
              <Image
                source={{
                  uri:
                    foto ||
                    "https://i.pinimg.com/736x/d9/35/ee/d935eee014980f34692e8a4a7382aaf9.jpg",
                }}
                width="100%"
                aspectRatio={1}
              />
              <Text color="black">{assolit || "No està assolit encara"}</Text>
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
              height={350}
              z={1001}
              position="absolute"
              items="center"
              onPress={flipCard}
            >
              <Text color="black">{descripcio || "Sense descripció"}</Text>
            </YStack>
          </AnimatedPressable>
        </>
      )}
    </>
  );
};
