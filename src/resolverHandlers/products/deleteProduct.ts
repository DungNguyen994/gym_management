import {
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { ProductModel } from "../../models/ProductModel";
import { MyContext, TextResponse } from "../../types";

export const deleteProductHandler = async (
  _parents: never,
  args: { id: string },
  { user }: MyContext
): Promise<TextResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    await ProductModel.findByIdAndDelete(args.id);
    return { data: "Deleted Product Successfully" };
  }
};
