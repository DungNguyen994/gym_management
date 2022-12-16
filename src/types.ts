import { Request, Response } from "express";
import { Field, ObjectType } from "type-graphql";
import { Error_Code } from "./constant";

type UserNameAndPasswordInput = {
  username: string;
  password: string;
  role: string;
};
interface RegisterInput {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
}
interface MyContext {
  user: User;
  res: Response;
  req: Request;
}

@ObjectType()
class User {
  @Field()
  username: string | undefined;
  @Field()
  firstName: string | undefined;
  @Field()
  lastName: string | undefined;
  @Field()
  phoneNumber: string | undefined;
  @Field()
  email: string | undefined;
  @Field()
  password: string;
  role: string;
}

@ObjectType()
class Error {
  @Field()
  type: Error_Code;
  @Field()
  pointer?: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field()
  errors?: Error;
  @Field()
  data?: User;
}

@ObjectType()
class ListUserResponse {
  @Field()
  errors?: Error;
  @Field()
  data?: User[];
}

@ObjectType()
class TextResponse {
  @Field()
  errors?: Error;
  @Field()
  data?: string;
}
@ObjectType()
class Payment {
  @Field()
  readonly id?: string;
  @Field()
  products: Product[];
  @Field()
  createdAt?: string;
  @Field()
  memberId?: string;
  @Field()
  collected: number;
  @Field()
  change: number;
  @Field()
  total: number;
  @Field()
  paymentMethod: string;
}
@ObjectType()
class PaymentInput {
  @Field()
  membershipType: string;
  @Field()
  term: string;
  @Field()
  collected: number;
  @Field()
  change: number;
  @Field()
  total: number;
  @Field()
  paymentMethod: string;
  @Field()
  memberId: string;
}
@ObjectType()
class MembershipInput {
  @Field()
  membershipType: string;
  @Field()
  startDate: string;
  @Field()
  endDate: string;
  @Field()
  term: string;
  @Field()
  status: string;
  @Field()
  holdDate: string;
}
@ObjectType()
class Member {
  @Field()
  readonly id: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  birthDate: string;
  @Field()
  phoneNumber: string;
  @Field()
  email: string;
  @Field()
  address: string;
  @Field()
  note: string;
  @Field()
  gender: string;
  @Field()
  photo: string;
  @Field()
  memberships: MembershipInput[];
  @Field()
  payment: PaymentInput;
}
@ObjectType()
class AddMemberInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  birthDate: string;
  @Field()
  phoneNumber: string;
  @Field()
  email: string;
  @Field()
  address: string;
  @Field()
  note: string;
  @Field()
  gender: string;
  @Field()
  photo: string;
  @Field()
  membership: MembershipInput;
  @Field()
  payment: PaymentInput;
}
@ObjectType()
class AddProductInput {
  @Field()
  productType: string;
  @Field()
  productName: string;
  @Field()
  photo: string;
  @Field()
  unitPrice: number;
  @Field()
  discountPercent: number;
  @Field()
  supplier: string;
}
@ObjectType()
class StockIn {
  @Field()
  productId: string;
  @Field()
  quantity: number;
}
@ObjectType()
class Inventory {
  @Field()
  readonly id: string;
  @Field()
  productType: string;
  @Field()
  productName: string;
  @Field()
  productId: string;
  @Field()
  quantity: number;
  @Field()
  unitPrice: number;
  @Field()
  discountPercent: number;
  @Field()
  supplier: string;
  @Field()
  photo: string;
}
@ObjectType()
class Product {
  @Field()
  readonly id: string;
  @Field()
  readonly productId?: string;
  @Field()
  readonly inventoryId: string;
  @Field()
  productType: string;
  @Field()
  productName: string;
  @Field()
  photo: string;
  @Field()
  unitPrice: number;
  @Field()
  buyQuantity: number;
  @Field()
  discountPercent: number;
  @Field()
  supplier: string;
}
@ObjectType()
class InventoryResponse {
  @Field()
  data?: Inventory;
  @Field()
  errors?: Error;
}
@ObjectType()
class ListInventoryResponse {
  @Field()
  data?: Inventory[];
  @Field()
  errors?: Error;
}
@ObjectType()
class MemberResponse {
  @Field()
  data?: Member;
  @Field()
  errors?: Error;
}
@ObjectType()
class ListMemberResponse {
  @Field()
  data?: Member[];
  @Field()
  errors?: Error;
}
@ObjectType()
class ProductResponse {
  @Field()
  data?: Product;
  @Field()
  errors?: Error;
}
@ObjectType()
class ListProductResponse {
  @Field()
  data?: Product[];
  @Field()
  errors?: Error;
}
export {
  Error,
  UserNameAndPasswordInput,
  User,
  UserResponse,
  Member,
  TextResponse,
  ListUserResponse,
  MemberResponse,
  ListMemberResponse,
  MyContext,
  RegisterInput,
  AddMemberInput,
  AddProductInput,
  Product,
  ListProductResponse,
  ProductResponse,
  Inventory,
  StockIn,
  InventoryResponse,
  ListInventoryResponse,
  Payment,
};
