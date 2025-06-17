import { View, Dimensions, Keyboard } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import MapCat from "components/MapCat";
import { YStack, Text } from "tamagui";
import { useState, useEffect } from "react";
import { Polaroid } from "components/Polaroid";
import { AddMenu } from "components/AddMenu";
import { useCanvasGestures } from "components/gestures/useCanvasGestures";
import { SearchHomeBar } from "components/SerachHomeBar";
import { useComarques } from "hooks/useComarques";
import { ComarcaData } from "types/comarques";
import { useSharedValue } from "react-native-reanimated";
import { withTiming, runOnJS, useAnimatedStyle } from "react-native-reanimated";
import { useRepte } from "hooks/useRepte";
import MapCatRepte from "components/MapCatRepte";
import { Dropdown } from "react-native-element-dropdown";
import { useReptes } from "hooks/useReptes";
import { PolaroidRepte } from "components/PolaroidRepte";
const screen = Dimensions.get("window");

type RepteType = {
  id: number;
  titol: string;
};
type ReptesType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: RepteType[];
};

type InfoComarca = {
  descripcio_repte: string | null;
  assolit: boolean;
  foto: string | null;
  data: string | null;
  descripcio_assolit: string | null;
};

type ComarcaData = {
  d?: string; // si és un Path
  points?: string; // si és un Polygon
  viewBox?: string;
  info?: InfoComarca; // potser vols posar un tipus més específic si saps la forma de la resposta del backend
};
export default function InfiniteCanvas() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [comarca, setComarca] = useState<ComarcaData>({});
  const [info, setInfo] = useState("");
  const { comarques, isLoading, error, createFriend } = useComarques();
  const [repteId, setRepteId] = useState<number>(-1);
  const [map, setMap] = useState<"amics" | "reptes">("amics");
  const translateX = useSharedValue(0);
  const [visiblerepte, setVisiblerepte] = useState(false);
  const [comarcaRepte, setComarcaRepte] = useState<ComarcaData>({});
  const { reptes } = useReptes();
  useEffect(() => {
    if (reptes) {
      setRepteId(reptes.results[0]?.id || -1);
    }
  }, [reptes]);
  // Updated function to handle page transitions from SearchHomeBar
  const handlePageChange = (newPage: "amics" | "reptes") => {
    if (newPage === map) return; // Don't animate if it's the same page

    const direction = newPage === "reptes" ? -1 : 1; // reptes slides left, amics slides right

    // Slide current page out
    translateX.value = withTiming(
      direction * screen.width,
      { duration: 300 },
      () => {
        runOnJS(setMap)(newPage);

        // Bring new page in from opposite side
        translateX.value = -direction * screen.width;
        translateX.value = withTiming(0, { duration: 300 });
      }
    );
  };

  const switchMap = () => {
    const nextMap = map === "amics" ? "reptes" : "amics";
    handlePageChange(nextMap);
  };
  const { ComarquesMap, reload } = useRepte({
    id: repteId,
  });

  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <>
      <SearchHomeBar onPress={handlePageChange} pagina={map} />
      {(open || visible || visiblerepte) && (
        <YStack
          position="absolute"
          fullscreen
          bg="rgba(0,0,0,0.3)"
          z={1000}
          onPress={() => {
            setOpen(false);
            setVisible(false);
            setVisiblerepte(false);
          }}
        />
      )}

      <Polaroid
        visible={visible}
        onClose={() => setVisible(false)}
        content={comarca}
      />
      <PolaroidRepte
        reload={reload}
        visible={visiblerepte}
        onClose={() => setVisiblerepte(false)}
        content={comarcaRepte}
        repteId={"" + repteId}
      />
      <AddMenu open={open} setOpen={setOpen} addAmic={createFriend} />

      {/* Wrap the entire map content in animated view for transitions */}
      <Animated.View
        style={[{ flex: 1, backgroundColor: "white" }, slideStyle]}
      >
        {map === "amics" ? (
          isLoading ? (
            <YStack flex={1} justify="center" items="center">
              <Text>Carregant mapa...</Text>
              {/* Pots afegir un spinner si vols */}
            </YStack>
          ) : (
            <MapCanvas
              setVisible={(val) => setVisible(val)}
              setComarca={(com) => setComarca(com)}
              comarques={comarques}
              switchMap={switchMap}
            />
          )
        ) : (
          <MapCanvasRepte
            visible={visiblerepte}
            setVisible={(vis) => setVisiblerepte(vis)}
            comarques={ComarquesMap}
            switchMap={switchMap}
            setComarca={(comarca) => setComarcaRepte(comarca)}
            reptes={reptes}
            setRepteId={(id) => {
              console.log("Setting repte ID:", id);
              setRepteId(id);
              // Aquí pots fer alguna acció amb l'ID del repte
            }}
          />
        )}
      </Animated.View>
    </>
  );
}

const MapCanvas = ({ setVisible, setComarca, comarques, switchMap }) => {
  const touchPath = (region: string) => {
    setTimeout(() => {
      if (!isPanning.value) {
        Keyboard.dismiss();
        console.log(`Pressed ${region}`);
        setVisible(true);
        setComarca(comarques[region] || {});
        //setInfo(comarques[region] || "No info available");
      }
    }, 100); // Delay to avoid immediate re-render
  };
  const { gesture, animatedStyle, isPanning } = useCanvasGestures(switchMap);
  return (
    <GestureDetector gesture={gesture}>
      <View style={{ flex: 1 }}>
        <Animated.View style={[{ flex: 1 }, animatedStyle]}>
          <MapCat onPathPress={touchPath} comarques={comarques} />
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

interface MapCanvasRepteProps {
  comarques: any;
  switchMap: () => void;
  reptes: ReptesType | null;
  setRepteId: (id: number) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  setComarca: (comarca: ComarcaData) => void;
}

const MapCanvasRepte = ({
  visible,
  setVisible,
  comarques,
  setComarca,
  switchMap,
  reptes,
  setRepteId,
}: MapCanvasRepteProps) => {
  const touchPath = (region: string) => {
    setTimeout(() => {
      if (!isPanning.value) {
        console.log(`Pressed ${region}`);
        setVisible(true);
        setComarca(comarques[region] || {});
        //setInfo(comarques[region] || "No info available");
      }
    }, 100); // Delay to avoid immediate re-render
  };
  const { gesture, animatedStyle, isPanning } = useCanvasGestures(switchMap);
  reptes?.results.map((repte) => {
    console.log("Repte:", repte);
    return {
      label: repte.titol,
      value: repte.id.toString(),
    };
  });

  const [val, setVal] = useState(reptes?.results[0]?.id.toString() || "");
  return (
    <>
      <YStack ml={50} mr={50} mt={30}>
        <Dropdown
          data={
            reptes?.results.map((repte) => ({
              label: repte.titol,
              value: repte.id.toString(),
            })) || []
          }
          labelField="label"
          valueField="value"
          placeholder={val}
          value={val}
          onChange={(item) => {
            setRepteId(parseInt(item.value, 10));
            setVal(item.value);
          }}
        />
      </YStack>
      <GestureDetector gesture={gesture}>
        <View style={{ flex: 1 }}>
          <Animated.View style={[{ flex: 1 }, animatedStyle]}>
            <MapCatRepte onPathPress={touchPath} comarques={comarques} />
          </Animated.View>
        </View>
      </GestureDetector>
    </>
  );
};
