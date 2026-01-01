// React
import { useCallback, useState } from "react";



// 
export default function useDelData() {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const delData = useCallback(async (endpoint, userToken) => {
    if (!endpoint) {
      setError({ msg: "missing endpoint!!!" });
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;
    
    setLoading(true);

    const url = `http://localhost:8080/${endpoint}`;
    const myHeaders = new Headers();
    
    if (userToken) {
      myHeaders.append("authorization", `bearer ${userToken}`);
    }

    try {
      const response = await fetch(url, { 
        signal,
        method: "DELETE",
        headers: myHeaders,
      });
      console.log("calling useDelData endpoint: ", endpoint);

      const res = await response.json();

      if (!response.ok) {
        throw res;
      }
      
      setResult(res);
    } catch (err) {
      // Won't setError() when aborted
      if (signal.aborted) {
        return;
      }

      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { error, loading, result, delData };
}