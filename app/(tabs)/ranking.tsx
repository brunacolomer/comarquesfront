import React, { use, useCallback, useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { YStack } from 'tamagui';
import { RankingItem } from '../../components/RankingItem';
import { PodiTop3 } from '../../components/PodiTop3';
import { useRanking } from '../../hooks/useRanking';

export default function Ranking() {
  const [usuariVisible, setUsuariVisible] = useState(false);

  const { ranking, loading, error } = useRanking();
  const usuariActual = ranking.find((item) => item.es_meu);
  const top3 = ranking.slice(0, 3);

  const handleMostrar = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const visible = viewableItems.some(item => item.item.es_meu);
    if (!visible) setUsuariVisible(true);
  }, []);

  const handleAmagar = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const completamentVisible = viewableItems.some(item => item.item.es_meu);
    if (completamentVisible) setUsuariVisible(false);
  }, []);

  const configMostrar = useRef({ viewAreaCoveragePercentThreshold: 1 });
  const configAmagar = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const callbackPairs = useRef([
    { viewabilityConfig: configMostrar.current, onViewableItemsChanged: handleMostrar },
    { viewabilityConfig: configAmagar.current, onViewableItemsChanged: handleAmagar }
  ]);

  return (
    <YStack flex={1} bg="$background">
      <FlatList
        data={ranking}
        keyExtractor={(item) => item.username}
        ListHeaderComponent={<PodiTop3 top3={top3} />}
        renderItem={({ item, index }) => (
          <RankingItem
            posicio={index + 1}
            username={item.username}
            punts={item.puntuacio}
            destacat={item.es_meu}
          />
        )}
        viewabilityConfigCallbackPairs={callbackPairs.current}
      />

      {usuariVisible && usuariActual && (
        <YStack position="absolute" b={0} l={0} r={0} bg="$neutralLight" >
          <RankingItem
            posicio={ranking.findIndex(item => item.es_meu) + 1}
            username={usuariActual.username}
            punts={usuariActual.puntuacio}
            destacat
          />
        </YStack>
      )}
    </YStack>
  );
}
