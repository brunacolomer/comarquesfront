import { YStack, XStack, Input, Text } from "tamagui";

export const SearchHomeBar = ({ onPress, pagina }) => {
  return (
    <YStack ml={40} mr={40} mt={70}>
      <XStack>
        <Input placeholder="Busca" flex={1}></Input>
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
