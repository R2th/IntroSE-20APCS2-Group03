import { useState, useEffect } from "react";
import { fullPathAPI } from "utils/helpers";

export const useFetch = (
  path,
  initData,
  resFormula = (data) => {
    return data.data;
  },
  headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  method = "GET"
) => {
  const [data, setData] = useState(initData);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      switch (method) {
        case "POST": {
          if (typeof initData !== "object") {
            setError("Invalid type for POST request");
            break;
          }
          try {
            const postResponse = await fetch(
              path.startsWith("http" ? path : fullPathAPI(path)),
              {
                method,
                headers,
                body: JSON.stringify(initData),
              }
            );
            const postJson = await postResponse.json();
            setData(postJson.data);
          } catch (err) {
            setError(err);
          }
          break;
        }
        default: {
          try {
            const getResponse = await fetch(
              path.startsWith("http") ? path : fullPathAPI(path),
              {
                method,
                mode: "cors",
                headers,
              }
            );

            const resJson = await getResponse.json();
            setData(resFormula(resJson));
          } catch (err) {
            setError(err);
          }
          break;
        }
      }
    };
    fetchData();
    //eslint-disable-next-line
  }, []);

  return {
    data,
    error,
  };
};
