import { InventoryModel } from "../../models/Inventory";
import {
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import {
  Inventory,
  MyContext,
  Product,
  StockIn,
  TextResponse,
} from "../../types";
import { ProductModel } from "../../models/ProductModel";

export const stockInHandler = async (
  _parents: never,
  args: StockIn,
  { user }: MyContext
): Promise<TextResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    const existProductInInventory = (await InventoryModel.findOne({
      productId: args.productId,
    }).exec()) as Inventory;
    if (existProductInInventory) {
      await InventoryModel.findByIdAndUpdate(existProductInInventory.id, {
        quantity:
          Number(existProductInInventory.quantity) + Number(args.quantity),
      });
    } else {
      const product = (await ProductModel.findById(
        args.productId
      ).exec()) as Product;
      const inventory = new InventoryModel({
        ...args,
        productName: product.productName,
        productType: product.productType,
        supplier: product.supplier,
        photo: product.photo,
        productId: product.id,
        discountPercent: product.discountPercent,
        unitPrice: product.unitPrice,
      });
      await inventory.save();
    }
    return { data: "Stocked In Successfully" };
  }
};
