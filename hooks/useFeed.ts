import { useEffect, useState } from "react";
import { getFeed } from "services/feed";

type FeedItem = {
  id: number;
  nickname: string;
  temps_fa: string;
  comarca: string;
  repte_id: number;
  repte_titol: string;
  foto: string;
};

export const useFeed = () => {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const data = await getFeed();
        setFeed(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  return { feed, loading, error };
};
