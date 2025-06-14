import { XStack, YStack, Text } from "tamagui";
import { AvatarInicial } from "components/Avatar";
import { LayoutChangeEvent } from "react-native";

export const RankingItem = ({
  posicio,
  username,
  punts,
  destacat = false,
}: {
  posicio: number;
  username: string;
  punts: number;
  destacat?: boolean;
}) => (
  <YStack
    width="100%"
    py="$2"
    px="$4"
    justify="space-between"
    items="flex-start"
    borderBottomWidth={1}
    bg={destacat ? "$yellow3" : undefined}
    borderColor={"$primaryDark"}
  >
    <XStack width="100%" py="$3" px="$4" items="center" justify="space-between">
      {/* Bloc esquerre: posició, avatar, nom */}
      <XStack items="center" gap="$3">
        <Text fontWeight="bold" width={20}>
          {posicio}
        </Text>
        <AvatarInicial username={username} size={40} />
        <Text>{username}</Text>
      </XStack>

      {/* Bloc dret: punts */}
      <Text>{punts} punts</Text>
    </XStack>
  </YStack>
);
