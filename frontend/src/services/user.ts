import appAxios from "../lib/appAxios";
import { User } from "../models/User.interface";

export const getUser = (): Promise<User> =>
  appAxios
    .get("/auth/me")
    .then((res) => res.data.data.user)
    .catch((err: any) => {
      throw Error(err?.response?.data?.message);
    });

export const login = (data: {
  email: string;
  password: string;
}): Promise<User> =>
  appAxios
    .post("/auth/login", data)
    .then((res) => res.data.data.user)
    .catch((err: any) => {
      throw Error(err?.response?.data?.message);
    });

export const logout = (): Promise<null> =>
  appAxios
    .post("/auth/logout")
    .then(() => null)
    .catch((err: any) => {
      throw Error(err?.response?.data?.message);
    });
