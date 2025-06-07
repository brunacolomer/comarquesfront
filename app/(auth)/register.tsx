import { router } from "expo-router";
import {
  Anchor,
  H2,
  Paragraph,
  XStack,
  YStack,
  Text,
  Input,
  Button,
} from "tamagui";
import { Eye, EyeOff, Weight } from "@tamagui/lucide-icons";
import { useState } from "react";

import { useSession } from "../../auth/ctx";

export default function Register() {
  const { signIn } = useSession();
  const [visible, setVisible] = useState(false);
  return (
    <YStack flex={1} items="center" gap="$8" px="$2" pt="$5" bg="$background">
      <H2
        onPress={() => {
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace("/");
        }}
      >
        Entra
      </H2>
      <Text>Entra el teu correu i contrasenya per logejarte</Text>

      <YStack bg="red">
        <Text>Hola</Text>
      </YStack>
    </YStack>
  );
}
