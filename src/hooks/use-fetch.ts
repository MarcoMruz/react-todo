import { useState, useEffect } from 'react';

type UseFetchReturnType<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export const useFetch = <T>(
  url: string,
  errorMsg?: string
): UseFetchReturnType<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();

        setData(json);
      } catch (error: any) {
        setError(errorMsg || error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();

    return () => {
      setData(null);
      setLoading(true);
      setError(null);
    };
  }, [url]);

  return { data, loading, error };
};
