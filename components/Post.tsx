import { YStack, XStack, Text, Image } from "tamagui";
import Svg, { Path } from "react-native-svg";
import MapaPathsComarques from "../constants/MapaPathsComarques_with_square_viewBox.json";

export const Post = ({
  id,
  nickname,
  temps_fa,
  comarca,
  repte_id,
  repte_titol,
  foto,
  onPress,
}) => {
  return (
    <YStack bg="white" onPress={onPress}>
      <XStack>
        <Svg width={50} height={50} viewBox={MapaPathsComarques[comarca].viewBox}>
          <Path
            d={MapaPathsComarques[comarca].d}
            fill="black"
            stroke="black"
            strokeWidth={2}
          ></Path>
        </Svg>
        <YStack>
          <Text fontWeight={800} fontSize={16}>
            {repte_titol}
          </Text>
          <XStack>
            <Text>@{nickname}</Text>
            <Text> · {temps_fa}</Text>
          </XStack>
          <Text>
            {nickname} ha desbloquejat {comarca}!
          </Text>
        </YStack>
      </XStack>
      <Image
        source={{
          uri: foto,
        }}
        width="100%"
        aspectRatio={1}
        borderRadius={15}
        mt={10}
      />
    </YStack>
  );
};
