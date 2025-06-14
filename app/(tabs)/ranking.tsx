import { YStack, ScrollView } from "tamagui";
import { PodiTop3 } from "../../components/PodiTop3";
import { RankingItem } from "../../components/RankingItem";

const ranking = [
  { username: "gatet", punts: 2420 },
  { username: "bruna", punts: 2300 },
  { username: "joel", punts: 2000 },
  { username: "maria", punts: 1900 },
  { username: "pol", punts: 1700 },
  { username: "nuria", punts: 1620},
  { username: "pau", punts: 1600 }, // no està al top
  { username: "sgi", punts: 1600 }, // no està al top

];

const usuariActual = "pau"; // usuari loguejat

export default function Ranking() {
  const posicioUsuari = ranking.findIndex((u) => u.username === usuariActual);
  const usuariDestacat = ranking[posicioUsuari];
  

  return (
    <YStack flex={1} bg="$background">
      <ScrollView>
        <PodiTop3 />

        {ranking.map((usuari, index) => (
          <RankingItem
            key={usuari.username}
            posicio={index + 1}
            username={usuari.username}
            punts={usuari.punts}
            destacat={usuari.username === usuariActual}
          />
        ))}

      </ScrollView>
      <RankingItem
            key={usuariActual}
            posicio={posicioUsuari+1}
            username={usuariActual}
            punts={usuariDestacat.punts}
            destacat
        />


    </YStack>
  );
}