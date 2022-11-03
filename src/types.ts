import { ObjectType, Field } from "type-graphql";
import { Error_Code } from "./constant";
import { Response, Request } from "express";

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
class Member {
  @Field()
  _id: string;
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
  term: string;
  @Field()
  membershipType: string;
  @Field()
  amount: string;
  @Field()
  paymentType: string;
  @Field()
  startDate: string;
  @Field()
  endDate: string;
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
};
