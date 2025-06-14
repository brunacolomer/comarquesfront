// components/PodiTop3.tsx
import { YStack, XStack, Text } from "tamagui";
import { AvatarInicial } from "./Avatar";

type PodiTop3Props = {
  top3: { username: string; puntuacio: number }[];
};

export const PodiTop3 = ({ top3 }: PodiTop3Props) => {
  const [primer, segon, tercer] = top3;

  return (
    <YStack bg="$background" p="$8" width="100%" items="center">
      <XStack gap="$6" items="flex-end">
        {/* 2n lloc */}
        {segon && (
          <YStack items="center" gap="$2">
            <Text fontSize={16} fontWeight="bold">2n</Text>
            <AvatarInicial username={segon.username} size={50} />
            <Text fontSize={18} fontWeight="bold">{segon.username}</Text>
            <Text>{segon.puntuacio} punts</Text>
          </YStack>
        )}

        {/* 1r lloc */}
        {primer && (
          <YStack items="center" gap="$2" style={{ transform: [{ translateY: -20 }] }}>
            <Text fontSize={16} fontWeight="bold">1r</Text>
            <AvatarInicial username={primer.username} size={70} />
            <Text fontSize={20} fontWeight="bold">{primer.username}</Text>
            <Text>{primer.puntuacio} punts</Text>
          </YStack>
        )}

        {/* 3r lloc */}
        {tercer && (
          <YStack items="center" gap="$2">
            <Text fontSize={16} fontWeight="bold">3r</Text>
            <AvatarInicial username={tercer.username} size={50} />
            <Text fontSize={18} fontWeight="bold">{tercer.username}</Text>
            <Text>{tercer.puntuacio} punts</Text>
          </YStack>
        )}
      </XStack>
    </YStack>
  );
};

