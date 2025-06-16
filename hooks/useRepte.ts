import { useEffect, useState } from "react";
import { getRepte } from "services/reptes";
import mapDataComarques from "../constants/MapaPathsComarques.json";

type ComarcaItem = {
  nom: string;
  descripcio_repte: string | null;
  assolit: boolean;
  foto: string | null;
  data: string | null;
  descripcio_assolit: string | null;
};

type capçalera = {
  id: number;
  titol: string;
  es_original: boolean;
};
type ComarquesRepte = {
  id: number;
  titol: string;
  es_original: boolean;
  comarques: ComarcaItem[];
};

export const useRepte = ({ id }: { id: number }) => {
  const [repte, setRepte] = useState<ComarquesRepte | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [ComarquesMap, setComarquesMap] = useState<{ [key: string]: any }>({});
  const [capçalera, setCapçalera] = useState<capçalera | null>(null);

  useEffect(() => {
    const fetchRepte = async () => {
      try {
        const data = await getRepte(id);
        setRepte(data);
        console.log(data);
        const mapa = { ...mapDataComarques };
        data.comarques.forEach((comarca) => {
          const nom = comarca.nom;
          console.log(
            "Nom comarca:",
            nom,
            "Dades comarca:",
            comarca.descripcio_repte
          );
          if (mapa[nom]) {
            mapa[nom] = {
              ...mapa[nom],
              info: comarca,
            };
          }
        });

        setCapçalera({
          id: data.id,
          titol: data.titol,
          es_original: data.es_original,
        });

        setComarquesMap(mapa);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepte();
  }, []);

  return { ComarquesMap, capçalera, loading, error };
};
