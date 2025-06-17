import { useEffect, useState } from "react";
import { getTikTok } from  "services/tiktok";

type RepteCopiat = {
  usuari_id: number;
  username: string;
  comarques: string[];
};


export const useTikTok = ({ originalId }: { originalId: number }) => {
  const [data, setData] = useState<RepteCopiat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getTikTok(originalId);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [originalId]);

  return { data, loading, error };
};
