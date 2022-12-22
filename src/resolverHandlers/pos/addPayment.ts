import dayjs from "dayjs";
import {
  DATE_FORMAT,
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { InventoryModel } from "../../models/Inventory";
import { PaymentModel } from "../../models/PaymentModel";
import { MyContext, Payment, TextResponse } from "../../types";

export const addPaymentHandler = async (
  _parents: never,
  args: Payment,
  { user }: MyContext
): Promise<TextResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    const payment = new PaymentModel({
      ...args,
      createdAt: dayjs().format(DATE_FORMAT),
    });
    const { products } = args;
    const inventories = await InventoryModel.find().exec();
    inventories.forEach((i) => {
      products.forEach((product) => {
        if (product.inventoryId === i.id && product.buyQuantity && i.quantity) {
          if (i.quantity > product.buyQuantity)
            i.quantity = i.quantity - product.buyQuantity;
          else {
            i.quantity = 0;
          }
        }
      });
      i.save();
    });
    await payment.save();
    return { data: "Added Payment Successfully" };
  }
};
