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
        if (res.status !== 200) {
          throw Error('error', res.status);
        }
        const json = await res.json();
        setLoading(false);
        setData(json);
      } catch (errorResp) {
        setLoading(false);
        setError(errorResp);
      }
    }
    fetchData();
  }, []);

  return { data, error, loading };
};

export default useAPI;
