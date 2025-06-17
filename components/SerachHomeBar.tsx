import { YStack, XStack, Input, Text } from "tamagui";
import { LogOut } from "@tamagui/lucide-icons";
import { useSession } from "auth/ctx";

export const SearchHomeBar = ({ onPress, pagina }) => {
  const { signOut } = useSession();
  return (
    <YStack pl={40} pr={40} pt={70} bg="white">
      <XStack items="center">
        <Input placeholder="Busca" flex={1}></Input>
        <LogOut onPress={signOut} ml={20}></LogOut>
      </XStack>
      <XStack mt={30} ml={10} gap="$3">
        <YStack>
          <Text
            fontSize={16}
            color={pagina === "amics" ? "black" : "grey"}
            fontWeight={"bold"}
            onPress={() => onPress("amics")}
          >
            Amics
          </Text>
        </YStack>
        <Text
          fontSize={16}
          color={pagina === "reptes" ? "black" : "grey"}
          fontWeight={"bold"}
          onPress={() => onPress("reptes")}
        >
          Reptes
        </Text>
      </XStack>
    </YStack>
  );
};
