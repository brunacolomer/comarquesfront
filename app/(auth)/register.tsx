import { useState } from "react";
import { router } from "expo-router";
import {
  Anchor,
  H2,
  XStack,
  YStack,
  Text,
  Input,
  Button,
  View,
  Separator,
  Select,
} from "tamagui";
import { Eye, EyeOff, Weight } from "@tamagui/lucide-icons";
import { SelectDemoItem } from "components/Dropdown";
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import Svg, { Path, Polygon } from "react-native-svg";
import mapDataComarques from "../../constants/MapaPathsComarques.json";
import { useSession } from "../../auth/ctx";

import { Dimensions } from "react-native";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function Register() {
  const { register } = useSession();
  const regisText = " Logeja't aquí";
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [poblacio, setPoblacio] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surnames, setSurnames] = useState("");
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        {/* Fons taronja separat, no afectat pel teclat */}
        <YStack
          position="absolute"
          t={0}
          l={0}
          r={0}
          height={screenHeight * 0.48}
        >
          <Svg width="100%" height="100%" viewBox={"500 50 300 75"}>
            {Object.keys(mapDataComarques).map((region) =>
              mapDataComarques[region].d ? (
                <Path
                  key={region}
                  d={mapDataComarques[region].d}
                  stroke="#C7A791"
                  strokeWidth="1"
                  fill="none"
                />
              ) : (
                <Polygon
                  key={region}
                  points={mapDataComarques[region].points}
                  stroke="#C7A791"
                  strokeWidth="1"
                  fill="none"
                />
              )
            )}

            {/* Rectangles de referència */}
          </Svg>
        </YStack>

        <YStack
          fullscreen
          flex={1}
          items="center"
          background="white"
          my={100}
          gap="$8"
          px="$2"
          pt="$5"
        >
          <H2 fontFamily={"$body"} fontSize={32} fontWeight="bold">
            Inicia sessió
          </H2>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <YStack
              borderTopLeftRadius={10}
              borderTopRightRadius={10}
              borderBottomLeftRadius={10}
              borderBottomRightRadius={10}
              bg="white"
              gap="$3"
              p="$4"
              width={screenWidth * 0.75}
            >
              <XStack justify={"center"} items={"center"} gap="$2" m={4}>
                <Separator />
                <Text fontWeight={"$4"} color="#9A9693" fontSize={"$1"}>
                  Benvingut de nou
                </Text>
                <Separator />
              </XStack>

              <XStack gap="$2">
                <Input
                  height={45}
                  flex={0.4}
                  mt="$2"
                  placeholder="Nom"
                  bg={"white"}
                  fontFamily={"$body"}
                  onChange={(e) => setName(e.nativeEvent.text)}
                />
                <Input
                  height={45}
                  flex={1}
                  mt="$2"
                  placeholder="Cognoms"
                  bg={"white"}
                  fontFamily={"$body"}
                  onChange={(e) => setSurnames(e.nativeEvent.text)}
                />
              </XStack>
              <Input
                height={45}
                placeholder="Correu electrònic"
                bg={"white"}
                fontFamily={"$body"}
                onChange={(e) => setUsername(e.nativeEvent.text)}
              />
              <Input
                height={45}
                placeholder="Nom d'usuari"
                bg={"white"}
                fontFamily={"$body"}
                onChange={(e) => setUsername(e.nativeEvent.text)}
              />
              <Input
                height={45}
                placeholder="Població"
                bg={"white"}
                fontFamily={"$body"}
                onChange={(e) => setPoblacio(e.nativeEvent.text)}
              />

              <XStack position="relative">
                <Input
                  height={45}
                  flex={1}
                  width="100%"
                  secureTextEntry={!visible}
                  placeholder="Contrasenya"
                  pr="$4"
                  bg={"white"}
                  onChange={(e) => setPassword(e.nativeEvent.text)}
                />
                <YStack
                  position="absolute"
                  height="100%"
                  r={0}
                  justify="center"
                  onPress={() => setVisible(!visible)}
                >
                  <Button
                    color={"black"}
                    unstyled
                    icon={visible ? Eye : EyeOff}
                    justify={"center"}
                    size={32}
                  />
                </YStack>
              </XStack>
              <XStack position="relative">
                <Input
                  height={45}
                  flex={1}
                  width="100%"
                  secureTextEntry={!visible}
                  placeholder="Repeteix la contrasenya"
                  pr="$4"
                  bg={"white"}
                  onChange={(e) => setRepeatPassword(e.nativeEvent.text)}
                />
                <YStack
                  position="absolute"
                  height="100%"
                  r={0}
                  justify="center"
                  onPress={() => setVisible(!visible)}
                >
                  <Button
                    color={"black"}
                    unstyled
                    icon={visible ? Eye : EyeOff}
                    justify={"center"}
                    size={32}
                  />
                </YStack>
              </XStack>
              <Button
                bg="$primary"
                mt="$7"
                height={45}
                onPress={() => {
                  register(username, password, email, name, surnames, poblacio);
                  // Navigate after signing in. You may want to tweak this to ensure sign-in is
                  // successful before navigating.
                  router.replace("/");
                }}
              >
                Registra't
              </Button>
              <XStack mt="$2" justify="center">
                <Text fontWeight={"$4"} color="#9A9693" fontSize={"$1"}>
                  Ja tens compte?
                  <Anchor
                    fontSize={"$1"}
                    color="#627b9f"
                    onPress={() => router.push("/(auth)/login2")}
                  >
                    {regisText}
                  </Anchor>
                </Text>
              </XStack>
            </YStack>
          </KeyboardAvoidingView>
        </YStack>
      </View>
    </TouchableWithoutFeedback>
  );
}
