// React
import { useCallback, useEffect, useState } from "react";



// 
export default function useGetData(endpoint, userToken) {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    setLoading(true);
    setError(null);

    const url = `http://localhost:8080/${endpoint}`; // TODO: change base URL to deploy
    const myHeaders = new Headers();
    
    if (userToken) {
      myHeaders.append("authorization", `bearer ${userToken}`);
    }

    try {
      const response = await fetch(url, { 
        signal,
        method: "GET",
        headers: myHeaders,
      });
      // console.log("calling useGetData endpoint: ", endpoint);

      const res = await response.json();

      if (!response.ok) {
        throw res;
      }
      
      setData(res);
    } catch (err) {
      // Won't setError() when aborted
      if (signal.aborted) {
        // console.log("signal aborted!");
        return;
      }

      setError(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, userToken]);

  // Fetch on mount?
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Manual refetch 
  const refetchData = useCallback(async () => {
    await fetchData();
  }, [fetchData]);  

  return { error, loading, data, refetchData };
}