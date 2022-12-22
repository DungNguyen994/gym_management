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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPaymentHandler = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const constant_1 = require("../../constant");
const Inventory_1 = require("../../models/Inventory");
const PaymentModel_1 = require("../../models/PaymentModel");
const addPaymentHandler = (_parents, args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        return { errors: constant_1.UnauthorizedError };
    const { role } = user;
    if (role === constant_1.User_Role.member)
        return { errors: constant_1.NoPermissionError };
    else {
        const payment = new PaymentModel_1.PaymentModel(Object.assign(Object.assign({}, args), { createdAt: (0, dayjs_1.default)().format(constant_1.DATE_FORMAT) }));
        const { products } = args;
        const inventories = yield Inventory_1.InventoryModel.find().exec();
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
        yield payment.save();
        return { data: "Added Payment Successfully" };
    }
});
exports.addPaymentHandler = addPaymentHandler;
//# sourceMappingURL=addPayment.js.map