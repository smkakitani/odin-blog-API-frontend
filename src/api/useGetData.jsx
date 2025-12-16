// React
import { useEffect, useState } from "react";


// 
export default function useGetData(endpoint) {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // const endpoint = "posts" // authors/:authorId

  useEffect(() => {
    if (endpoint) {
      const fetchData = async () => {
        const url = `http://localhost:8080/${endpoint}`;
        setError(null);
        // setLoading(true);

        try {
          const response = await fetch(url, { method: "GET" });
          console.log("calling useGetData");

          const data = await response.json();

          if (!response.ok) {
            throw new Error(response.status);
          }
          
          // console.dir(data);
          setData(data);
        } catch (err) {
          console.error('catching error xD',err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }

    return () => { setData(null)};
    
  }, [endpoint]);

  return { error, loading, data };
}