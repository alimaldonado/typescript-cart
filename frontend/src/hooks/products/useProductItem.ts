import { useAxios } from "../data/useAxios";
import { Product } from "./types";

export const useProductItem = (
  id: string
): { product: Product; cancel: () => void; error: string; loaded: boolean } => {
  const { cancel, data, error, loaded } = useAxios(`/products/${id}`, "GET");

  const product = {
    ...data,
    createdAt: new Date(data?.createdAt),
    updatedAt: new Date(data?.updatedAt),
  };

  return { product, cancel, error, loaded };
};
