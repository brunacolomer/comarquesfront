import { YStack, Text, Button, Image } from "tamagui";

import { Dimensions } from "react-native";

const screen = Dimensions.get("window");

export const Polaroid = ({
  visible,
  onClose,
  info,
}: {
  visible: boolean;
  onClose: () => void;
  info?: any;
}) => {
  return (
    <>
      {visible && (
        <YStack
          bg="white"
          p="$4"
          t={130}
          gap="$4"
          l={screen.width * 0.125}
          width={screen.width * 0.75}
          z={1001}
          position="absolute"
          items={"center"}
        >
          <Image
            source={{
              uri: "https://i.pinimg.com/736x/d9/35/ee/d935eee014980f34692e8a4a7382aaf9.jpg",
            }}
            width="100%"
            aspectRatio={1}
          />
          <Text color={"black"}> Holi</Text>
          <Text color={"black"}> info?.amics[0].descripcio</Text>
        </YStack>
      )}
    </>
  );
};
