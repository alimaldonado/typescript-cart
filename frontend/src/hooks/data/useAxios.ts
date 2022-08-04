import { useContext, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { AxiosContext } from "../../context/AxiosContext";

export const useAxios = (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  payload?: any
) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);

  const contextInstance = useContext(AxiosContext);
  const instance = useMemo(() => {
    return contextInstance || axios;
  }, [contextInstance]);

  const controllerRef = useRef(new AbortController());

  const cancel = () => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await instance.request({
          data: payload,
          signal: controllerRef.current.signal,
          method,
          url,
        });

        setData(response?.data);
      } catch (error: any) {
        setError(error?.message);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  return { cancel, data, error, loaded };
};
