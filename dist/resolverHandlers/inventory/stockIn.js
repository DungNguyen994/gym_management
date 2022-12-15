"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockInHandler = void 0;
const Inventory_1 = require("../../models/Inventory");
const constant_1 = require("../../constant");
const ProductModel_1 = require("../../models/ProductModel");
const stockInHandler = (_parents, args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        return { errors: constant_1.UnauthorizedError };
    const { role } = user;
    if (role === constant_1.User_Role.member)
        return { errors: constant_1.NoPermissionError };
    else {
        const existProductInInventory = (yield Inventory_1.InventoryModel.findOne({
            productId: args.productId,
        }).exec());
        if (existProductInInventory) {
            yield Inventory_1.InventoryModel.findByIdAndUpdate(existProductInInventory.id, {
                quantity: Number(existProductInInventory.quantity) + Number(args.quantity),
            });
        }
        else {
            const product = (yield ProductModel_1.ProductModel.findById(args.productId).exec());
            const inventory = new Inventory_1.InventoryModel(Object.assign(Object.assign({}, args), { productName: product.productName, productType: product.productType, supplier: product.supplier, photo: product.photo, productId: product.id, discountPercent: product.discountPercent, unitPrice: product.unitPrice }));
            yield inventory.save();
        }
        return { data: "Stocked In Successfully" };
    }
});
exports.stockInHandler = stockInHandler;
//# sourceMappingURL=stockIn.js.map