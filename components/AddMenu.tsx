import { YStack, Button, Text, Dialog, XStack, Image, Input, RadioGroup,  Label } from "tamagui";
import { BackHandler } from "react-native";
import { useEffect, useState } from "react";
import { ChevronDown, X, Camera } from "@tamagui/lucide-icons";
import { createFriendship } from "services/friendship";
import * as ImagePicker from "expo-image-picker";
import { createOriginalRepte } from "services/repteoriginal";
export const AddMenu = ({ open, setOpen, addAmic, reload}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogRepteOpen, setDialogRepteOpen] = useState(false);
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
              setDialogRepteOpen(true);
              setOpen(false);
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
      <AddOriginalRepteDialog
        open={dialogRepteOpen}
        setOpen={setDialogRepteOpen}
        onCreate={async ({ titol, visiblitat, permissos }) => {
          try {
            const resposta = await createOriginalRepte(titol, visiblitat, permissos);
            console.log("Repte creat:", resposta);
            reload();
            // opcional: redirigeix a /repte/:id
            // router.push(`/repte/${resposta.id}`);
          } catch (err) {
            alert("Error creant repte");
            console.error(err);
          }
        }}
      />
      <Button
        circular
        size="$5"
        bg={open ? "$red10" : "$primary"}
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


function RadioGroupItemWithLabel(props: {
  size: any
  value: string
  label: string
  group?: string // 👈 afegeix identificador únic per grup
}) {
  const id = `radiogroup-${props.group ?? "default"}-${props.value}`;
  return (
    <XStack width={300} items="center" space="$4">
      <RadioGroup.Item value={props.value} id={id} size={props.size} key={id}>
        <RadioGroup.Indicator />
      </RadioGroup.Item>
      <Label size={props.size} htmlFor={id} key={id}>
        {props.label}
      </Label>
    </XStack>
  );
}



const AddOriginalRepteDialog = ({
  open,
  setOpen,
  onCreate,
}: {
  open: boolean;
  setOpen: (b: boolean) => void;
  onCreate: (dades: {
    titol: string;
    visiblitat: "PUBLIC" | "AMICS" | "ME";
    permissos: "PUBLIC" | "AMICS" | "ME";
  }) => void;
}) => {
  const [titol, setTitol] = useState("");
  const [visiblitat, setVisiblitat] = useState<"PUBLIC" | "AMICS" | "ME">("PUBLIC");
  const [permissos, setPermissos] = useState<"PUBLIC" | "AMICS" | "ME">("PUBLIC");

  return (
    <Dialog modal open={open}>
      <Dialog.Portal>
        <Dialog.Overlay bg="rgba(0,0,0,0.2)" />

        <Dialog.Content bordered elevate width={320} gap="$4" p="$4">
          <Dialog.Title>Afegeix un repte</Dialog.Title>
          <Dialog.Description>
            Escriu el títol i defineix visibilitat i permisos.
          </Dialog.Description>

          <Input
            placeholder="Títol del repte"
            onChange={(e) => setTitol(e.nativeEvent.text)}
          />

          <Text fontWeight="600">Qui pot veure el repte?</Text>
          <RadioGroup
            value={visiblitat}
            onValueChange={(v) => setVisiblitat(v as any)}
            name="visibilitat"
          >
            <YStack gap="$2">
              <RadioGroupItemWithLabel group="visibilitat" value="PUBLIC" label="Públic" size="$3" />
              <RadioGroupItemWithLabel group="visibilitat" value="AMICS" label="Només amics" size="$3" />
              <RadioGroupItemWithLabel group="visibilitat" value="ME" label="Privat (només jo)" size="$3" />
            </YStack>
          </RadioGroup>

          <Text fontWeight="600">Qui pot copiar el repte?</Text>
          <RadioGroup
            value={permissos}
            onValueChange={(v) => setPermissos(v as any)}
            name="permissos"
          >
            <YStack gap="$2">
              <RadioGroupItemWithLabel group="permissos" value="PUBLIC" label="Tothom" size="$3" />
              <RadioGroupItemWithLabel group="permissos" value="AMICS" label="Només amics" size="$3" />
              <RadioGroupItemWithLabel group="permissos" value="ME" label="Ningú" size="$3" />
            </YStack>
          </RadioGroup>

          <XStack justifyContent="flex-end" gap="$2">
            <Dialog.Close asChild>
              <Button
                theme="active"
                onPress={() => {
                  onCreate({ titol, visiblitat, permissos });
                  setOpen(false);
                }}
              >
                Crear repte
              </Button>
            </Dialog.Close>
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};