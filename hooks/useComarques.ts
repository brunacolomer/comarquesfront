import { useEffect, useState } from "react";
import { getComarques } from "services/comarques";
import mapDataComarques from "../constants/MapaPathsComarques.json";
import { ComarquesMap } from "types/comarques";
import { createFriendship } from "services/friendship";

export const useComarques = () => {
  const [comarques, setComarques] = useState<ComarquesMap>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchComarques = async () => {
    setIsLoading(true);
    try {
      const backendData = await getComarques();
      const mapa = { ...mapDataComarques };
      console.log(backendData);
      Object.keys(backendData).map((region) => {
        if (mapa[region]) {
          console.log("es aixo", backendData[region]);
          mapa[region] = {
            ...mapa[region], // dades visuals del mapa (path, etc.)
            info: backendData[region], // afegim info nova
          };
        }
      });

      setComarques(mapa);
    } catch (err) {
      console.error("Error carregant comarques:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchComarques();
  }, []);

  const createFriend = async (
    image: { uri: string; name: string; type: string } | null,

    friend: string,

    descripcio: string
  ) => {
    console.log("holaaaaa siii");
    // Fem l'optimistic update

    console.log("image, a la crida", image);
    console.log("nom a la crida", friend);
    console.log("descripcio", descripcio);
    // Crida real al backend
    try {
      await createFriendship(image, friend, descripcio);
      fetchComarques();
    } catch (error) {
      console.error(
        "Error enviant al backend, però ja hem fet optimistic update"
      );
      // podries revertir aquí si vols, però sovint no cal
    }
  };

  return { comarques, isLoading, error, createFriend };
};
