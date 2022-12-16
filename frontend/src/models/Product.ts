import { User } from "./User.interface";

export interface Product {
  id: number;
  name: string;
  price: string;
  sellerId: number;
  seller: User;
}
