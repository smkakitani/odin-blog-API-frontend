// React
import { useEffect, useState } from "react";



// 
export default function usePostData(formData, endpoint, userToken) {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (formData && endpoint) {
      const postForm = async () => {
        const url = `http://localhost:8080/${endpoint}`; // TODO: change base URL to deploy
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        setError(null);
        setIsLoading(true);

        if (userToken) {
          myHeaders.append("authorization", `bearer ${userToken}`);
        }

        try {
          const response = await fetch(url, {
            signal,
            method: "POST",
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
          // console.error('usePostData error: ',err);
          setError(err);
        } finally {
          setIsLoading(false);
        }
      }

      postForm();
    }

    return () => { 
      controller.abort();
      
      setError(null);
      setResult(null);
      setIsLoading(false);        
    };

  }, [formData, endpoint, userToken]);

  return { error, result, isLoading };
};