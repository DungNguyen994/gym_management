import {
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { ProductModel } from "../../models/ProductModel";
import { ListProductResponse, MyContext, Product } from "../../types";

export const getProductsHandler = async (
  _parents: never,
  _args: never,
  { user }: MyContext
): Promise<ListProductResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    const products = (await ProductModel.find().exec()) as Product[];
    return { data: products };
  }
};
