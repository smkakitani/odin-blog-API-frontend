// React
import { useEffect, useState } from "react";



// 
export default function usePutData(formData, endpoint, userToken) {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (formData) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      setIsLoading(true);
      
      if (userToken) {
          myHeaders.append("authorization", `bearer ${userToken}`);
      }
      
      // console.log(formData, userToken);
      const putData = async () => {
        const url = `http://localhost:8080/${endpoint}`; // TODO: change PORT 

        try {
          const response = await fetch(url, {
            signal,
            method: "PUT",
            mode: "cors",
            headers: myHeaders,
            body: JSON.stringify(formData),
          });

          const res = await response.json();

          if (!response.ok) {
            // Server sends json with errors message
            throw res;
          }

          setResult(res);
        } catch (err) {
          console.error('usePostData error: ',err);
          setError(err);
        } finally {
          setIsLoading(false);
        }
      } 
      putData();
    }
    // Clean up function with abort 
    return () => {
      controller.abort();
      setError(null);
      setResult(null);
      setIsLoading(false);
    }
  }, [formData, endpoint, userToken]);

  return { error, result, isLoading };
}