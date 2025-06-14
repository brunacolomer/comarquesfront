// components/PodiTop3.tsx
import { YStack, XStack, Text } from "tamagui";
import { AvatarInicial } from "./Avatar";

export const PodiTop3 = () => {
  return (
    <YStack bg={"$primary"} p="$8" width="100%" items="center">
      <XStack gap="$6" items="flex-end">
        {/* 2n lloc */}
        <YStack items="center" gap="$2">
          <Text fontSize={16} fontWeight="bold">2n</Text>
          <AvatarInicial username="gatet" size={50} />
          <Text fontSize={18} fontWeight="bold">gatet</Text>
          <Text>2200 punts</Text>
        </YStack>

        {/* 1r lloc */}
        <YStack items="center" gap="$2" style={{ transform: [{ translateY: -20 }] }}>
          <Text fontSize={16} fontWeight="bold">1r</Text>
          <AvatarInicial username="gatet" size={70} />
          <Text fontSize={20} fontWeight="bold">gatet</Text>
          <Text>2420 punts</Text>
        </YStack>

        {/* 3r lloc */}
        <YStack items="center" gap="$2">
          <Text fontSize={16} fontWeight="bold">3r</Text>
          <AvatarInicial username="gateta" size={50}/>
          <Text fontSize={18} fontWeight="bold">gateta</Text>
          <Text>2100 punts</Text>
        </YStack>
      </XStack>
    </YStack>
  );
};

