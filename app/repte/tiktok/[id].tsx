import { YStack, Text, ButtonIcon, XStack, Label, RadioGroup, ScrollView, Button, Dialog } from "tamagui";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import Svg, { Path, Polygon } from "react-native-svg";
import MapaPathsComarques from "../../../constants/MapaPathsComarques.json";
import { useOriginal } from "hooks/useOriginal";
import { useTikTok } from "hooks/useTiktok";
import { useTheme } from "tamagui";
import { useEffect, useState } from "react";
import { copiarRepte } from "services/copiarepte"; // adapta la ruta


export default function MoreReptes() {
  const { id } = useLocalSearchParams();
  const { data, loading, error } = useOriginal({ id: Number(id) });
  const theme = useTheme();
  const original = data?.original;
  const copiats = data?.copiats;
  const mapes = Array.from({ length: copiats?.length ?? 0 }, (_, i) => i); // o el que vulguis
  const [showModal, setShowModal] = useState(false);

  
  return (
     <>
    <ScrollView showsVerticalScrollIndicator={false}>
      <YStack flex={1} p={20}>
        <XStack mt={30}>
          <Svg width={150} height={150} viewBox="0 0 800 800">
            {Object.entries(MapaPathsComarques).map(([region, shape]) => {
              //Aqui s'ha de difuminar original?.pot_veure
              const isAssolit = original?.assolits.some(
                (a) => a.comarca === region
              );
              const filling = isAssolit ? theme.primary.val : "none";
              return MapaPathsComarques[region].d ? (
                <Path
                  key={region}
                  d={shape.d}
                  fill={filling}
                  stroke="black"
                  strokeWidth="1"
                />
              ) : (
                <Polygon
                  key={region}
                  points={MapaPathsComarques[region].points}
                  fill={filling}
                  stroke="black"
                  strokeWidth="1"
                />
              );
            })}
          </Svg>
          <YStack>
            <Text maxW={195} m={5} fontWeight={800} fontSize={24}>
              {original?.titol}
            </Text>
            <Text mt={5}> @{original?.usuari.username}</Text>
          </YStack>
        </XStack>
        <YStack mt={20}>
          {mapes.map((_, i) => {
            if (i % 3 !== 0) return null; // només volem començar nova fila cada 3

            return (
              <XStack key={i} gap="$2">
                {[0, 1, 2].map((offset) => {
                  const index = i + offset;
                  if (index >= mapes.length) return null;
                  const repte = copiats?.[index];
                  console.log("Repte:", repte);
                  return (
                    
                    <YStack key={repte?.id ?? index} onPress={()=> router.push(`/repte/${repte?.id}`)}items="center"> 
                      <Mapa  comarques={repte?.comarques ?? []}/>
                      <Text fontWeight={100} fontSize={10} mb={10}>
                        @{repte?.username}
                      </Text>
                    </YStack>
                  );
                })}
              </XStack>
            );
          })}
        </YStack>
      </YStack>
    </ScrollView>
{/* Botó fixat a baix de la pantalla */}
    {original?.es_copiable && (<YStack
      position="absolute"
      b={0}
      l={0}
      r={0}
      pb={100}
      items="center"
    >
      <Button
        width="90%"
        onPress={() => {
          // Posar un modal de confirmació aquí
          setShowModal(true);
        }}
        icon={<Text></Text>}
      >
        Vols copiar el repte?
      </Button>
      <CopiarRepteDialog
        open={showModal}
        setOpen={setShowModal}
        onConfirm={async(visibilitat) => {
          try {
            const resposta = await copiarRepte(visibilitat, Number(id));
            console.log("Repte copiat:", resposta);
            // opcional: redirigeix al nou repte
            router.push(`/home`)
          } catch (err) {
            alert("Error copiant repte. Revisa la consola.");
         }       
   }}
      />
    </YStack>
    )}
  </>
  );
}

const Mapa = ({ comarques }: { comarques?: string[] }) => {
  const theme = useTheme();
  return (
    <Svg width={120} height={120} viewBox="0 0 800 800">
      {Object.entries(MapaPathsComarques).map(([region, data]) => {
        //const friends = 0; // Aquí pots ajustar la lògica per obtenir el nombre d'amics
        const isAssolida = comarques?.includes(region);
        const filling = isAssolida ? theme.primary.val : "none";

        return MapaPathsComarques[region].d ? (
          <Path
            key={region}
            d={data.d}
            fill={filling}
            stroke="black"
            strokeWidth="1"
          />
        ) : (
          <Polygon
            key={region}
            points={MapaPathsComarques[region].points}
            fill={filling}
            stroke="black"
            strokeWidth="1"
          />
        );
      })}
    </Svg>
  );
};

function RadioGroupItemWithLabel(props: {
  size: any
  value: string
  label: string
}) {
  const id = `radiogroup-${props.value}`
  return (
    <XStack width={300} items="center" space="$4">
      <RadioGroup.Item value={props.value} id={id} size={props.size}>
        <RadioGroup.Indicator />
      </RadioGroup.Item>

      <Label size={props.size} htmlFor={id}>
        {props.label}
      </Label>
    </XStack>
  )
}

const CopiarRepteDialog = ({
  open,
  setOpen,
  onConfirm,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: (visibilitat: "PUBLIC" | "AMICS" | "PRIVAT") => void;
}) => {
  const [visibilitat, setVisibilitat] = useState<"PUBLIC" | "AMICS" | "PRIVAT">("PUBLIC");

  return (
    <Dialog modal open={open}>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          bg="rgba(0,0,0,0.3)"
          animation="quick"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          key="content"
          bordered
          elevate
          width={300}
          animation="quick"
          enterStyle={{ y: 20, opacity: 0 }}
          exitStyle={{ y: 10, opacity: 0 }}
          gap="$4"
        >
          <Dialog.Title fontSize={20} >
            Vols copiar aquest repte?
          </Dialog.Title>

          <Text fontWeight="600">Selecciona la visibilitat:</Text>
          <RadioGroup
            value={visibilitat}
            onValueChange={(value) => setVisibilitat(value as any)}
            name="visibilitat"
          >
            <YStack width={300}items="center" space="$2">
              <RadioGroupItemWithLabel size="$3" value="PUBLIC" label="Públic" />
              <RadioGroupItemWithLabel size="$3" value="AMICS" label="Amics" />
              <RadioGroupItemWithLabel size="$3" value="ME" label="Privat" />
            </YStack>
          </RadioGroup>

          <XStack content="flex-end" gap="$2">
            <Dialog.Close asChild>
              <Button
                onPress={() => {
                  setOpen(false);
                }}
              >
                Cancel·la
              </Button>
            </Dialog.Close>

            <Dialog.Close asChild>
              <Button
                onPress={() => {
                  onConfirm(visibilitat);
                  setOpen(false);
                }}
                theme="active"
              >
                Copiar
              </Button>
            </Dialog.Close>
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};