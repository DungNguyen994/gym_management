import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type User {
    username: String
    email: String
    phoneNumber: String
  }
  input NoteInput {
    message: String
  }
  type MemberNote {
    message: String
    createdAt: String
  }
  input PaymentInput {
    productId: ID
    productName: String!
    unitPrice: Float!
    total: Float!
    collected: Float!
    change: Float!
    term: String
    quantity: Int
  }
  type Payment {
    productId: ID
    productName: String!
    createdAt: String!
    unitPrice: Float!
    total: Float!
    collected: Float!
    change: Float!
    term: String
    quantity: Int
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
    firstName: String!
    lastName: String!
    phoneNumber: String!
    birthDate: String
    email: String
    address: String
    note: String
    gender: String
    payments: [Payment!]!
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
      notes: [NoteInput]
      gender: String
      payment: PaymentInput!
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
