import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type User {
    username: String
    email: String
    phoneNumber: String
  }

  type Error {
    type: String
    pointer: String
    message: String
  }

  type UserResponse {
    errors: Error
    data: User
  }

  type ListUserResponse {
    errors: Error
    data: [User]
  }

  type Member {
    _id: ID
    firstName: String
    lastName: String
    phoneNumber: String
    birthDate: String
    email: String
    address: String
    note: String
    gender: String
    term: String
    membershipType: String
    paymentType: String
    amount: String
    startDate: String
    endDate: String
    photo: String
  }

  type MemberResponse {
    errors: Error
    data: Member
  }

  type ListMemberResponse {
    errors: Error
    data: [Member]
  }

  type TextResponse {
    errors: Error
    data: String
  }

  type Query {
    users: ListUserResponse
    user(username: String!): UserResponse
    me: UserResponse
    members: ListMemberResponse
    member(phoneNumber: String!): MemberResponse
    refreshToken: TextResponse
    logout: TextResponse
  }

  type Mutation {
    register(
      username: String!
      password: String!
      firstName: String!
      lastName: String!
      phoneNumber: String!
      email: String!
    ): TextResponse
    login(username: String!, password: String!): TextResponse
    removeUser(username: String!): TextResponse
    addMember(
      firstName: String!
      lastName: String!
      phoneNumber: String!
      birthDate: String
      email: String
      address: String
      note: String
      gender: String
      term: String!
      membershipType: String!
      paymentType: String!
      amount: String!
      startDate: String!
      endDate: String!
      photo: String
    ): TextResponse
    updateMember(
      _id: ID!
      firstName: String!
      lastName: String!
      phoneNumber: String!
      birthDate: String
      email: String
      address: String
      note: String
      gender: String
      photo: String
    ): TextResponse
  }
`;
