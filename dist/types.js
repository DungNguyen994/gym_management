"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitHistory = exports.VisitHistoryResponse = exports.Membership = exports.Payment = exports.ListInventoryResponse = exports.InventoryResponse = exports.StockIn = exports.Inventory = exports.ProductResponse = exports.ListProductResponse = exports.Product = exports.AddProductInput = exports.AddMemberInput = exports.ListMemberResponse = exports.MemberResponse = exports.ListUserResponse = exports.TextResponse = exports.Member = exports.UserResponse = exports.User = exports.Error = void 0;
const type_graphql_1 = require("type-graphql");
const constant_1 = require("./constant");
let User = class User {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Object)
], User.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Object)
], User.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Object)
], User.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Object)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Object)
], User.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
User = __decorate([
    (0, type_graphql_1.ObjectType)()
], User);
exports.User = User;
let Error = class Error {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Error.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Error.prototype, "pointer", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Error.prototype, "message", void 0);
Error = __decorate([
    (0, type_graphql_1.ObjectType)()
], Error);
exports.Error = Error;
let UserResponse = class UserResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Error)
], UserResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", User)
], UserResponse.prototype, "data", void 0);
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
exports.UserResponse = UserResponse;
let ListUserResponse = class ListUserResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Error)
], ListUserResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Array)
], ListUserResponse.prototype, "data", void 0);
ListUserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], ListUserResponse);
exports.ListUserResponse = ListUserResponse;
let TextResponse = class TextResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Error)
], TextResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], TextResponse.prototype, "data", void 0);
TextResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], TextResponse);
exports.TextResponse = TextResponse;
let VisitHistory = class VisitHistory {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], VisitHistory.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], VisitHistory.prototype, "memberId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], VisitHistory.prototype, "date", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], VisitHistory.prototype, "memberName", void 0);
VisitHistory = __decorate([
    (0, type_graphql_1.ObjectType)()
], VisitHistory);
exports.VisitHistory = VisitHistory;
let VisitHistoryResponse = class VisitHistoryResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Error)
], VisitHistoryResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Array)
], VisitHistoryResponse.prototype, "data", void 0);
VisitHistoryResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], VisitHistoryResponse);
exports.VisitHistoryResponse = VisitHistoryResponse;
let Payment = class Payment {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Payment.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Array)
], Payment.prototype, "products", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Payment.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Payment.prototype, "memberId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Payment.prototype, "collected", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Payment.prototype, "change", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Payment.prototype, "total", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Payment.prototype, "paymentMethod", void 0);
Payment = __decorate([
    (0, type_graphql_1.ObjectType)()
], Payment);
exports.Payment = Payment;
let PaymentInput = class PaymentInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], PaymentInput.prototype, "membershipType", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], PaymentInput.prototype, "term", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], PaymentInput.prototype, "collected", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], PaymentInput.prototype, "change", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], PaymentInput.prototype, "total", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], PaymentInput.prototype, "paymentMethod", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], PaymentInput.prototype, "memberId", void 0);
PaymentInput = __decorate([
    (0, type_graphql_1.ObjectType)()
], PaymentInput);
let Membership = class Membership {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Membership.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Membership.prototype, "membershipType", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Membership.prototype, "startDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Membership.prototype, "endDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Membership.prototype, "term", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Membership.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Membership.prototype, "holdDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Membership.prototype, "memberId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Membership.prototype, "remainingDays", void 0);
Membership = __decorate([
    (0, type_graphql_1.ObjectType)()
], Membership);
exports.Membership = Membership;
let Member = class Member {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Member.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Member.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Member.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Member.prototype, "birthDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Member.prototype, "phoneNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Member.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Member.prototype, "address", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Member.prototype, "note", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Member.prototype, "gender", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Member.prototype, "photo", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Member.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Member.prototype, "currentMembershipType", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Member.prototype, "remainingDays", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Array)
], Member.prototype, "memberships", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Membership)
], Member.prototype, "newMembership", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", PaymentInput)
], Member.prototype, "payment", void 0);
Member = __decorate([
    (0, type_graphql_1.ObjectType)()
], Member);
exports.Member = Member;
let AddMemberInput = class AddMemberInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddMemberInput.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddMemberInput.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddMemberInput.prototype, "birthDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddMemberInput.prototype, "phoneNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddMemberInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddMemberInput.prototype, "address", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddMemberInput.prototype, "note", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddMemberInput.prototype, "gender", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddMemberInput.prototype, "photo", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Membership)
], AddMemberInput.prototype, "membership", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", PaymentInput)
], AddMemberInput.prototype, "payment", void 0);
AddMemberInput = __decorate([
    (0, type_graphql_1.ObjectType)()
], AddMemberInput);
exports.AddMemberInput = AddMemberInput;
let AddProductInput = class AddProductInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddProductInput.prototype, "productType", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddProductInput.prototype, "productName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddProductInput.prototype, "photo", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], AddProductInput.prototype, "unitPrice", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], AddProductInput.prototype, "discountPercent", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddProductInput.prototype, "supplier", void 0);
AddProductInput = __decorate([
    (0, type_graphql_1.ObjectType)()
], AddProductInput);
exports.AddProductInput = AddProductInput;
let StockIn = class StockIn {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], StockIn.prototype, "productId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], StockIn.prototype, "quantity", void 0);
StockIn = __decorate([
    (0, type_graphql_1.ObjectType)()
], StockIn);
exports.StockIn = StockIn;
let Inventory = class Inventory {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Inventory.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Inventory.prototype, "productType", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Inventory.prototype, "productName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Inventory.prototype, "productId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Inventory.prototype, "quantity", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Inventory.prototype, "unitPrice", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Inventory.prototype, "discountPercent", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Inventory.prototype, "supplier", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Inventory.prototype, "photo", void 0);
Inventory = __decorate([
    (0, type_graphql_1.ObjectType)()
], Inventory);
exports.Inventory = Inventory;
let Product = class Product {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Product.prototype, "productId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Product.prototype, "inventoryId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Product.prototype, "productType", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Product.prototype, "productName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Product.prototype, "photo", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Product.prototype, "unitPrice", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Product.prototype, "buyQuantity", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Product.prototype, "discountPercent", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Product.prototype, "supplier", void 0);
Product = __decorate([
    (0, type_graphql_1.ObjectType)()
], Product);
exports.Product = Product;
let InventoryResponse = class InventoryResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Inventory)
], InventoryResponse.prototype, "data", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Error)
], InventoryResponse.prototype, "errors", void 0);
InventoryResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], InventoryResponse);
exports.InventoryResponse = InventoryResponse;
let ListInventoryResponse = class ListInventoryResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Array)
], ListInventoryResponse.prototype, "data", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Error)
], ListInventoryResponse.prototype, "errors", void 0);
ListInventoryResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], ListInventoryResponse);
exports.ListInventoryResponse = ListInventoryResponse;
let MemberResponse = class MemberResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Member)
], MemberResponse.prototype, "data", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Error)
], MemberResponse.prototype, "errors", void 0);
MemberResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], MemberResponse);
exports.MemberResponse = MemberResponse;
let ListMemberResponse = class ListMemberResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Array)
], ListMemberResponse.prototype, "data", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Error)
], ListMemberResponse.prototype, "errors", void 0);
ListMemberResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], ListMemberResponse);
exports.ListMemberResponse = ListMemberResponse;
let ProductResponse = class ProductResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Product)
], ProductResponse.prototype, "data", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Error)
], ProductResponse.prototype, "errors", void 0);
ProductResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], ProductResponse);
exports.ProductResponse = ProductResponse;
let ListProductResponse = class ListProductResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Array)
], ListProductResponse.prototype, "data", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Error)
], ListProductResponse.prototype, "errors", void 0);
ListProductResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], ListProductResponse);
exports.ListProductResponse = ListProductResponse;
//# sourceMappingURL=types.js.map