import { YStack, Button, Text, Dialog, XStack, Image, Input } from "tamagui";
import { BackHandler } from "react-native";
import { useEffect, useState } from "react";
import { ChevronDown, X, Camera } from "@tamagui/lucide-icons";
import { createFriendship } from "services/friendship";
import * as ImagePicker from "expo-image-picker";

export const AddMenu = ({ open, setOpen, addAmic }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const onBackPress = () => {
      if (dialogOpen) {
        setDialogOpen(false); // tancar el diàleg manualment
        return true; // prevenir acció per defecte (sortir de l'app o pantalla)
      }
      return false; // permet l'acció per defecte si no hi ha cap diàleg obert
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => subscription.remove();
  }, [dialogOpen]);
  return (
    <YStack
      position="absolute"
      b={30}
      r={30}
      items="flex-end"
      z={1001}
      space="$3"
    >
      {open && (
        <>
          <Button
            bg="$background"
            elevate
            size="$4"
            onPress={() => {
              console.log("Nota");
              setDialogOpen(true);
              setOpen(false);
            }}
          >
            ✏️ Afegir una amistat
          </Button>
          <Button
            bg="$background"
            elevate
            size="$4"
            onPress={() => {
              console.log("Nota");
              setDialogOpen(true);
            }}
          >
            ✏️ Afegir nou repte
          </Button>
        </>
      )}

      <AddFriendshipDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        addAmic={addAmic}
      />
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

const AddFriendshipDialog = ({ open, setOpen, addAmic }) => {
  const [image, setImage] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);
  console.log("image", image);
  const [descripcio, setDescripcio] = useState<string>("");
  const [friend, setFriend] = useState<string>("");

  return (
    <Dialog modal open={open}>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          bg="transparent"
          animateOnly={["transform", "opacity"]}
          animation={[
            "quicker",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          width={300}
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={[
            "quicker",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: 20, opacity: 0 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title fontSize={40}>Afegeix una amistat</Dialog.Title>
          <Dialog.Description>
            Afegeix el teu amic aquí i posa una foto representativa de la vostra
            amistat!!
          </Dialog.Description>
          <Input
            placeholder="nom del teu amigui"
            onChange={(e) => setFriend(e.nativeEvent.text)}
          ></Input>
          <Input
            placeholder="descripcio de la vostra amistat"
            multiline
            onChange={(e) => setDescripcio(e.nativeEvent.text)}
          ></Input>
          <Button
            icon={Camera}
            onPress={async () => {
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
              });

              if (!result.canceled) {
                const asset = result.assets[0];
                setImage({
                  uri: asset.uri,
                  name: asset.fileName || "imatge.jpg",
                  type: asset.type || "image/jpeg",
                });
              }
            }}
          >
            Afegir Foto
          </Button>
          {image && (
            <Image
              source={{ uri: image.uri }}
              style={{
                width: 200,
                height: 200,
                marginTop: 10,
                borderRadius: 10,
              }}
            />
          )}
          <XStack items="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              <Button
                theme="accent"
                aria-label="Close"
                onPress={() => {
                  addAmic(image, friend, descripcio);
                  setOpen(false);
                }}
              >
                Afegeix
              </Button>
            </Dialog.Close>
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
