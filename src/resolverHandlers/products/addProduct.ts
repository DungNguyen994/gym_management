import { ProductModel } from "../../models/ProductModel";
import {
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { AddProductInput, MyContext, TextResponse } from "../../types";

export const addProductHandler = async (
  _parents: never,
  args: AddProductInput,
  { user }: MyContext
): Promise<TextResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    const product = new ProductModel(args);
    await product.save();
    return { data: "Added Product Successfully" };
  }
};
