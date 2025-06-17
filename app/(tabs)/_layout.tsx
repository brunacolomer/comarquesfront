import { Tabs } from "expo-router";
import { useTheme } from "tamagui";
import {
  Home,
  Map,
  Archive,
  Download,
  Medal,
  Compass,
} from "@tamagui/lucide-icons";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        sceneStyle: {
          backgroundColor: "white", // <- això és clau per evitar parpelleigs foscos
        },

        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 70,
        },
        tabBarActiveTintColor: "#C47F3D",
        tabBarInactiveTintColor: "#2D221B",
        tabBarLabelStyle: {
          fontSize: 10,
          marginBottom: 5,
        },
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Mapa",
          headerShown: false, // si vols ocultar el header
          tabBarIcon: ({ color }) => <Map color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",
          tabBarIcon: ({ color }) => <Compass color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: "Rànking",
          tabBarIcon: ({ color }) => <Medal color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
