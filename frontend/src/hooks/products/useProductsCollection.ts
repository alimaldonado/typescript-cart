import { useAxios } from "../data/useAxios";
import { Product } from "./types";

export const useProductsCollection = (): {
  cancel: () => void;
  products: Product[];
  error: string;
  loaded: boolean;
} => {
  const { cancel, data, error, loaded } = useAxios("/products", "GET");

  const products = data?.map((product: any) => ({
    ...product,
    createdAt: new Date(product?.createdAt),
    updatedAt: new Date(product?.updatedAt),
  }));

  return { cancel, products, error, loaded };
};
