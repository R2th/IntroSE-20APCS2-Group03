import { useState, useEffect } from 'react';
// eslint-disable-next-line
import { fullPathAPI } from 'utils/helpers';

const useFetch = (
  path,
  initData,
  resFormula = (prev, data) => {
    if (prev === initData) {
      return data.data;
    }
    return [...prev, ...data.data];
  },
  headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  method = 'GET',
) => {
  const [data, setData] = useState(initData);
  const [error, setError] = useState('');

  const fetchData = async (dump = resFormula) => {
    switch (method) {
      case 'POST': {
        if (typeof initData !== 'object') {
          setError('Invalid type for POST request');
          break;
        }
        try {
          const postResponse = await fetch(path.startsWith('http' ? path : fullPathAPI(path)), {
            method,
            headers,
            body: JSON.stringify(initData),
          });
          const postJson = await postResponse.json();
          setData(postJson.data);
        } catch (err) {
          setError(err);
        }
        break;
      }
      default: {
        try {
          const getResponse = await fetch(path.startsWith('http') ? path : fullPathAPI(path), {
            method,
            mode: 'cors',
            headers,
          });

          const resJson = await getResponse.json();
          setData((prev) => dump(prev, resJson));
        } catch (err) {
          setError(err);
        }
        break;
      }
    }
  };

  const reloadFetch = async () => {
    await fetchData(resFormula);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return {
    data,
    error,
    reloadFetch,
  };
};

export default useFetch;
