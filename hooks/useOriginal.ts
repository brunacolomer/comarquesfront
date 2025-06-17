import { useEffect, useState } from "react";
import { getOriginal } from "services/original";
import { getTikTok } from "services/tiktok";

type RepteCopiat = {
  id: number;
  usuari_id: number;
  username: string;
  comarques: string[];
};

type OriginalData = {
  id: number;
  titol: string;
  usuari: {
    id: number;
    username: string;
  };
  es_teu: boolean;
  es_visible: boolean;
  es_copiable: boolean;
  assolits: { comarca: string }[];
};

type CombinedData = {
  original: OriginalData;
  copiats: RepteCopiat[];
};

export const useOriginal = ({ id }: { id: number }) => {
  const [data, setData] = useState<CombinedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const original = await getOriginal(id);
        const copiats = await getTikTok(original.id);
        setData({ original, copiats });
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
};
