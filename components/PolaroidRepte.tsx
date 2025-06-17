import { YStack, Text, Button, Image, Dialog, XStack, Input } from "tamagui";
import FlipCard from "react-native-flip-card";
import { Dimensions, View, Pressable } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "@tamagui/lucide-icons";
import addImage from "../assets/images/addimage.png";
import { createAssolit } from "services/reptes";
import { reload } from "expo-router/build/global-state/routing";

export type Repte = {
  assolit: boolean;
  data: string; // o Date si després la parses
  descripcio_assolit: string;
  descripcio_repte: string;
  foto: string;
  nom: string;
};

export type ComarcaData = {
  d?: string;
  points?: string;
  viewBox?: string;
  info?: Repte;
};

export type ComarquesMap = {
  [region: string]: ComarcaData;
};

const screen = Dimensions.get("window");
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export const PolaroidRepte = ({
  visible,
  onClose,
  info,
  content,
  repteId = "-1",
  reload = () => {},
}: {
  visible: boolean;
  onClose: () => void;
  info?: any;
  content: ComarcaData;
  repteId: string;
  reload?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
    onClose();
  };
  const [customImage, setCustomImage] = useState<{
    uri: string;
    name: string;
    type: string;
  }>({} as any);
  return (
    <>
      <AssoleixRepte
        open={open && visible}
        setOpen={close}
        comarca={content.info?.nom}
        repteId={repteId}
        reloadi={reload}
        setCustomImage={setCustomImage}
      />
      {visible && !content.info?.foto && (
        <YStack items="center" t={450}>
          <Button position="absolute" z={2001} onPress={() => setOpen(true)}>
            <Text>Assoleix el repte</Text>
          </Button>
        </YStack>
      )}
      <Card
        visible={visible}
        onClose={onClose}
        foto={
          content.info?.foto ||
          "https://i.pinimg.com/736x/d9/35/ee/d935eee014980f34692e8a4a7382aaf9.jpg"
        }
        descripcio={content.info?.descripcio_repte || null}
        assolit={content.info?.descripcio_assolit || null}
      ></Card>
    </>
  );
};

export const Card = ({
  visible,
  onClose,
  foto,
  descripcio,
  assolit,
}: {
  visible: boolean;
  onClose: () => void;
  info?: any;
  foto: string;
  descripcio: string | null;
  assolit: string | null;
}) => {
  const rotation = useSharedValue(0);
  const flipCard = () => {
    rotation.value = withTiming(rotation.value === 0 ? 180 : 0, {
      duration: 500,
    });
  };

  const frontStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotation.value}deg` }],
      backfaceVisibility: "hidden",
    };
  });

  const backStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotation.value + 180}deg` }],
      backfaceVisibility: "hidden",
      position: "absolute",
      top: 0,
    };
  });
  return (
    <>
      {visible && (
        <>
          <AnimatedPressable
            style={[
              {
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: 1001,
              },
              frontStyle,
            ]}
            onPress={onClose}
          >
            <YStack
              bg="white"
              p="$4"
              t={250}
              gap="$4"
              l={screen.width * 0.125}
              width={screen.width * 0.75}
              z={1001}
              position="absolute"
              items="center"
              onPress={flipCard}
            >
              <Image
                onPressIn={() => console.log("holaaaaa")}
                source={{
                  uri:
                    foto ||
                    "https://i.pinimg.com/736x/d9/35/ee/d935eee014980f34692e8a4a7382aaf9.jpg",
                }}
                width="100%"
                aspectRatio={1}
              />
              <Text color="black">{assolit || "No està assolit encara"}</Text>
            </YStack>
          </AnimatedPressable>
          <AnimatedPressable
            style={[
              {
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: 1001,
              },
              backStyle,
            ]}
            onPress={onClose}
          >
            <YStack
              bg="white"
              p="$4"
              t={250}
              gap="$4"
              l={screen.width * 0.125}
              width={screen.width * 0.75}
              height={350}
              z={1001}
              position="absolute"
              items="center"
              onPress={flipCard}
            >
              <Text color="black">{descripcio || "Sense descripció"}</Text>
            </YStack>
          </AnimatedPressable>
        </>
      )}
    </>
  );
};

const AssoleixRepte = ({
  open,
  setOpen,
  comarca,
  repteId,
  setCustomImage,
  reloadi = () => {},
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  comarca: string;
  repteId: string;
  reloadi?: () => void;
  setCustomImage: (image: { uri: string; name: string; type: string }) => void;
}) => {
  const [image, setImage] = useState<{
    uri: string;
    name: string;
    type: string;
  }>({} as any); // Inicialitza com a objecte buit per evitar errors inicials
  console.log("image", image);
  const [descripcio, setDescripcio] = useState<string>("");

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
          width={320}
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
          <Dialog.Title fontSize={40}>Has aconseguit {comarca}</Dialog.Title>
          <Dialog.Description>
            Afegeix una foto i posa una descripció per deixar constància del teu
            assoliment
          </Dialog.Description>

          <Input
            placeholder="Descripció de l'assoliment"
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
                setCustomImage({
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
                  createAssolit({
                    repteId: repteId,
                    image: image,
                    comarca: comarca,
                    descripcio: descripcio,
                    reload: reloadi,
                  });
                  setOpen(false);
                  setImage({} as any);
                  setTimeout(reloadi, 100);
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
