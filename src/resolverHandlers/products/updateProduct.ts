import { InventoryModel } from "../../models/Inventory";
import {
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { ProductModel } from "../../models/ProductModel";
import { MyContext, Product, TextResponse } from "../../types";

export const updateProductHandler = async (
  _parents: never,
  args: Product,
  { user }: MyContext
): Promise<TextResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    await ProductModel.findByIdAndUpdate(args.id, args);
    await InventoryModel.findOneAndUpdate({ productId: args.id }, args);
    return { data: "Updated Product Successfully" };
  }
};
