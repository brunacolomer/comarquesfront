import { YStack, XStack, Input, Text } from "tamagui";

export const SearchHomeBar = () => {
  return (
    <YStack m="$5" mt={60} bg="red">
      <XStack>
        <Input placeholder="Busca" flex={1}></Input>
      </XStack>
      <XStack mt={20}>
        <Text>Amiguis</Text>
        <Text>Reptes</Text>
      </XStack>
    </YStack>
  );
};
