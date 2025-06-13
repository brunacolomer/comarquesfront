import { YStack, Text, Button, Image } from "tamagui";
import FlipCard from "react-native-flip-card";
import { Dimensions, View } from "react-native";
import { useState } from "react";

const screen = Dimensions.get("window");

export default function FabMenuTamagui() {
  const [open, setOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);

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
      <FlipCard
        flip={flipped}
        style={{
          position: "absolute",
        }}
      >
        <YStack
          bg="white"
          p="$4"
          t={250}
          gap="$4"
          l={screen.width * 0.125}
          width={screen.width * 0.75}
          z={1001}
          items="center"
          onPress={() => setFlipped(true)}
        >
          <Text color="black">
            Encara no tens cap amic en aquesta comarca, surt del cau i ves a
            conèixer algú
          </Text>
        </YStack>
        <YStack
          bg="white"
          p="$4"
          t={250}
          gap="$4"
          l={screen.width * 0.125}
          width={screen.width * 0.75}
          z={1001}
          items="center"
          onPress={() => setFlipped(false)}
        >
          <Text color="black">Es el darrrrererererre</Text>
        </YStack>
      </FlipCard>
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
