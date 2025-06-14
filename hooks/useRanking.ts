import { useEffect, useState } from "react";
import { getRanking } from "../services/ranking";

export const useRanking= () => {
  const [ranking, setRanking] = useState<{ username: string; puntuacio: number ; es_meu: boolean}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const data = await getRanking();
        setRanking(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  return { ranking, loading, error };
}
