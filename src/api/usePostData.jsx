// React
import { useEffect, useState } from "react";



// 
export default function usePostData(formData, endpoint) {
  // const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (formData) {
      const postForm = async () => {
        const url = `http://localhost:3030/${endpoint}`; // TODO: change PORT

        setError(null);
        setIsLoading(true);

        try {
          const response = await fetch(url, {
            method: "POST",
            // headers: '', // headers???
            body: formData, // Should use new FormData()
          });

          setResult(response.json());
          // return response.json();
        } catch (err) {
          console.error(err);
          setError(err);
        } finally {
          setIsLoading(false);
        }
      }

      postForm();
      return () => {};
    }
  },[formData, endpoint]);

  return { error, result, isLoading };
};