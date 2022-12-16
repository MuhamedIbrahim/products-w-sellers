import appAxios from "../lib/appAxios";
import { Product } from "../models/Product";

export const getCart = (): Promise<Product[]> =>
  appAxios
    .get("/cart")
    .then((res) => res.data.data.cart)
    .catch((err: any) => {
      throw Error(err?.response?.data?.message);
    });

export const addToCart = (productId: number): Promise<Product[]> =>
  appAxios
    .post("/cart/add", { productId })
    .then((res) => res.data.data.cart)
    .catch((err: any) => {
      throw Error(err?.response?.data?.message);
    });

export const removeFromCart = (productId: number): Promise<Product[]> =>
  appAxios
    .post("/cart/remove", { productId })
    .then((res) => res.data.data.cart)
    .catch((err: any) => {
      throw Error(err?.response?.data?.message);
    });
