import {
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { InventoryModel } from "../../models/Inventory";
import { Inventory, ListInventoryResponse, MyContext } from "../../types";

export const getInventoryHandler = async (
  _parents: never,
  _args: never,
  { user }: MyContext
): Promise<ListInventoryResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    const inventory = (await InventoryModel.find().exec()) as Inventory[];
    return { data: inventory };
  }
};
