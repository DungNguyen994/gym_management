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
    paymentMethod: String!
  }
  input NewMembership {
    membershipType: String!
    startDate: String!
    endDate: String!
    term: String!
  }
  input NewPayment {
    productName: String
    membershipType: String
    unitPrice: Float
    total: Float!
    collected: Float!
    change: Float!
    term: String
    quantity: Int
    paymentMethod: String!
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
    paymentMethod: String!
  }
  type Membership {
    membershipType: String!
    startDate: String!
    endDate: String!
    term: String!
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
    id: ID
    firstName: String!
    lastName: String!
    phoneNumber: String!
    birthDate: String
    email: String
    address: String
    note: String
    gender: String
    memberships: [Membership!]!
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
    member(id: ID!): MemberResponse
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
      payment: NewPayment!
      membership: NewMembership!
      photo: String
    ): TextResponse
    updateMember(
      id: ID!
      firstName: String!
      lastName: String!
      phoneNumber: String!
      birthDate: String
      email: String
      address: String
      note: String
      gender: String
      photo: String
      memberships: [NewMembership]
      payment: NewPayment
    ): TextResponse
    deleteMember(id: ID!): TextResponse
  }
`;
