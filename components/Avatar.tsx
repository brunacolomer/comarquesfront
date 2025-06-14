// components/AvatarInicial.tsx
import { Avatar, Text, YStack } from "tamagui";

type Props = {
  username: string;
  size?: any;       // exemple: "$6" o 48
};

export const AvatarInicial = ({
  username,
  size = "$6",
}: Props) => {
  const inicial = username?.[0]?.toUpperCase() ?? "?";

  return (
    <Avatar circular size={size}>
        <Avatar.Fallback backgroundColor={"$primaryDark"} justifyContent="center" alignItems="center">
            <Text fontSize={24} fontWeight="bold" color="$color">
            {inicial}
            </Text>
        </Avatar.Fallback>
    </Avatar>
  );
};
