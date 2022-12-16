import appAxios from "../lib/appAxios";
import { Product } from "../models/Product";

export const getProducts = (): Promise<Product[]> =>
  appAxios
    .get("/product")
    .then((res) => res.data.data.products)
    .catch((err: any) => {
      throw Error(err?.response?.data?.message);
    });
