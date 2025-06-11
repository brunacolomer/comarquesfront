import { ChevronDown, X, Camera } from "@tamagui/lucide-icons";
import {
  Adapt,
  Button,
  Dialog,
  Fieldset,
  Input,
  Label,
  Paragraph,
  Select,
  Sheet,
  TooltipSimple,
  Unspaced,
  View,
  XStack,
  Image,
} from "tamagui";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { createFriendship } from "services/friendship";
export function DialogInstance({ disableAdapt }: { disableAdapt?: boolean }) {
  const [username, setUsername] = useState("");
  const [descripcio, setDescripcio] = useState("");
  const [image, setImage] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);

  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Button>Show Dialog{disableAdapt ? ` (No Adapt)` : ""}</Button>
      </Dialog.Trigger>

      {!disableAdapt && (
        <Adapt when="maxMd" platform="touch">
          <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
            <Sheet.Frame padding="$4" gap="$4">
              <Adapt.Contents />
            </Sheet.Frame>
            <Sheet.Overlay
              backgroundColor="$shadow6"
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>
      )}

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          bg="$shadow6"
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
          w={400}
          elevate
          borderRadius="$6"
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
          <Dialog.Title>Afegir Amistat</Dialog.Title>
          <Dialog.Description>Afegeix una amistat!</Dialog.Description>

          <Fieldset gap="$4" horizontal>
            <Label width={64} htmlFor="name">
              Name
            </Label>
            <Input
              flex={1}
              id="name"
              placeholder="Usuari"
              onChange={(e) => setUsername(e.nativeEvent.text)}
            />
          </Fieldset>
          <Button
            icon={Camera}
            onPress={async () => {
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
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
          <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              <Button
                theme="accent"
                aria-label="Close"
                onPress={() => {
                  console.log(image, username, descripcio);
                  createFriendship(image, username, descripcio);
                }}
              >
                Save changes
              </Button>
            </Dialog.Close>
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                right="$3"
                size="$2"
                circular
                icon={X}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
