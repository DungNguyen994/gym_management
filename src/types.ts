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
// @ObjectType()
// class Payment {
//   @Field()
//   readonly productId?: string;
//   @Field()
//   productName: string;
//   @Field()
//   membershipType: string;
//   @Field()
//   createdAt: string;
//   @Field()
//   quantity: number;
//   @Field()
//   collected: number;
//   @Field()
//   change: number;
//   @Field()
//   total: number;
//   @Field()
//   unitPrice: number;
//   @Field()
//   term: string;
//   @Field()
//   paymentMethod: string;
// }
@ObjectType()
class PaymentInput {
  @Field()
  productName: string;
  @Field()
  membershipType: string;
  @Field()
  quantity: number;
  @Field()
  unitPrice: number;
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
  onHold: boolean;
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
};
