import { YStack, Button, Text } from "tamagui";
export const AddMenu = ({ open, setOpen }) => {
  return (
    <YStack position="absolute" b={30} r={30} z={1001} space="$3">
      {open && (
        <>
          <Button
            bg="$background"
            elevate
            size="$4"
            onPress={() => console.log("Foto")}
          >
            📸 Foto
          </Button>
          <Button
            bg="$background"
            elevate
            size="$4"
            onPress={() => console.log("Nota")}
          >
            ✏️ Nota
          </Button>
        </>
      )}

      <Button
        circular
        size="$5"
        elevate
        bg={open ? "$red10" : "$blue10"}
        onPress={() => setOpen((prev) => !prev)}
      >
        <Text color="white">{open ? "×" : "+"}</Text>
      </Button>
    </YStack>
  );
};
