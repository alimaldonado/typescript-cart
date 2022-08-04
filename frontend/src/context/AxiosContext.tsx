import axios, { AxiosInstance } from "axios";
import {
  createContext,
  ReactNode,
  useEffect,
  useRef,
} from "react";

type AxiosInstanceProviderProps = {
  children: ReactNode;
  config: { [key: string]: any };
  requestInterceptors?: Array<any>;
  responseInterceptors?: Array<any>;
};

export const AxiosContext = createContext<AxiosInstance | null>(null);

export function AxiosInstanceProvider({
  children,
  config,
  requestInterceptors,
  responseInterceptors,
}: AxiosInstanceProviderProps) {
  const instanceRef = useRef(axios.create(config));

  useEffect(() => {
    requestInterceptors?.forEach((interceptor) => {
      instanceRef.current.interceptors.request.use(interceptor);
    });

    responseInterceptors?.forEach((interceptor) => {
      instanceRef.current.interceptors.response.use(interceptor);
    });
  }, []);

  return (
    <AxiosContext.Provider value={instanceRef.current}>
      {children}
    </AxiosContext.Provider>
  );
}
