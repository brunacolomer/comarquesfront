import { useState } from "react";
import { YStack, Text, Button, XStack, View } from "tamagui";

export default function FabMenuTamagui() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Fons enfosquit i bloquejant */}
      {open && (
        <YStack
          position="absolute"
          fullscreen
          bg="rgba(0,0,0,0.3)"
          z={1000}
          onPress={() => setOpen(false)}
        />
      )}

      <Text>Bon dia, què tal com estem família?</Text>

      <Button
        onPress={() => console.log("Pressed")}
        bg="$blue5"
        size="$4"
        mt="$4"
      >
        Press me
      </Button>

      <YStack position="absolute" b={30} r={30} z={1001}>
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
    </>
  );
}
