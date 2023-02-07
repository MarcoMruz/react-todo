import { useState, useEffect } from 'react';

type UseFetchReturnType<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

const useFetch = <T>(url: string, errorMsg?: string): UseFetchReturnType<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(errorMsg || null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const response = await fetch(url);
        const json = await response.json();

        setData(json);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();

    return () => {
      setData(null);
      setLoading(true);
      setError(errorMsg || null);
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
