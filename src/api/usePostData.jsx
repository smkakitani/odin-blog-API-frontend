// React
import { useEffect, useState } from "react";



// 
export default function usePostData(formData, endpoint) {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (formData) {
      const postForm = async () => {
        // http://localhost:8080/ for server
        const url = `http://localhost:8080/${endpoint}`; // TODO: change PORT

        setError(null);
        setIsLoading(true);

        try {
          const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
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

      postForm();
      return () => { setResult(null) };
    }
  },[formData, endpoint]);

  return { error, result, isLoading };
};