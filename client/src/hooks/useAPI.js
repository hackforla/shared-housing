import { useState, useEffect } from 'react';

const useAPI = (url, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setData(json);
        setLoading(false);
      } catch (errorResp) {
        setError(errorResp);
      }
    }
    fetchData();
  }, []);

  return { data, error, loading };
};

export default useAPI;
