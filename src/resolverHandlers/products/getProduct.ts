import {
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { ProductModel } from "../../models/ProductModel";
import { MyContext, Product, ProductResponse } from "../../types";

export const getProductHandler = async (
  _parents: never,
  args: { id: string },
  { user }: MyContext
): Promise<ProductResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    const product = (await ProductModel.findById(args.id)) as Product;
    return { data: product };
  }
};
