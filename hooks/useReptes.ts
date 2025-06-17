import { useEffect, useState } from "react";
import { getReptes } from "services/reptes";

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

export const useReptes = () => {
  const [reptes, setReptes] = useState<ReptesType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchReptes = async () => {
      try {
        const data = await getReptes();
        setReptes(data);
        console.log("Reptes carregats:", data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchReptes();
  }, []);

  return { reptes, loading, error };
};
