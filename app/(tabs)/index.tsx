import { ExternalLink } from "@tamagui/lucide-icons";
import { Anchor, H2, Paragraph, XStack, YStack, Text, Button } from "tamagui";
import { ToastControl } from "app/CurrentToast";
import { useSession } from "auth/ctx";
import { LogBox } from "react-native";

// 👇 Ignora el warning de "two children with the same key"
LogBox.ignoreLogs([
  "Warning: Encountered two children with the same key",
]);

export default function TabOneScreen() {
  const { signOut } = useSession();
  return (
    <YStack flex={1} items="center" gap="$8" px={20} pt="$5" bg="$background">
      <H2>Tamagui + Expo</H2>
      <ToastControl />
      <Text onPress={signOut}>Tanca la sessió</Text>
      <XStack
        items="center"
        justify="center"
        flexWrap="wrap"
        gap={4}
        position="absolute"
        b="$8"
      >
        <Paragraph fontSize="$4">Add</Paragraph>

        <Paragraph fontSize="$4" px="$2" py="$1" color="$blue10" bg="$blue5">
          tamagui.config.ts
        </Paragraph>

        <Paragraph fontSize="$4">to root and follow the</Paragraph>

        <XStack
          items="center"
          gap={4}
          px="$2"
          py="$1"
          rounded="$3"
          bg="$green5"
          hoverStyle={{ bg: "$green6" }}
          pressStyle={{ bg: "$green4" }}
        >
          <Anchor
            href="https://tamagui.dev/docs/core/configuration"
            textDecorationLine="none"
            color="$green10"
            fontSize="$4"
          >
            Configuration guide
          </Anchor>
          <ExternalLink size="$1" color="$green10" />
        </XStack>

        <Paragraph fontSize="$4" text="center">
          to configure your themes and tokens.
        </Paragraph>
      </XStack>
    </YStack>
  );
}
