"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_core_1 = require("apollo-server-core");
exports.typeDefs = (0, apollo_server_core_1.gql) `
  type User {
    id: String
    username: String
    email: String
    phoneNumber: String
    firstName: String
    lastName: String
    role: String
    photo: String
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
    collected: Float
    change: Float
    term: String
    quantity: Int
    paymentMethod: String!
  }
  input ProductInput {
    inventoryId: ID!
    productId: ID!
    productName: String!
    supplier: String
    productType: String
    unitPrice: Float!
    discountPercent: Float
    buyQuantity: Int
  }
  input NewMembership {
    membershipType: String!
    startDate: String!
    endDate: String!
    term: String!
    status: String
  }
  input NewPayment {
    productName: String
    membershipType: String
    unitPrice: Float
    total: Float!
    collected: Float
    change: Float
    term: String
    quantity: Int
    paymentMethod: String!
  }
  type Membership {
    id: ID
    membershipType: String!
    startDate: String!
    endDate: String!
    term: String!
    status: String!
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
    photo: String
    status: String
    currentMembershipType: String
    remainingDays: Int
    memberships: [Membership]
    createdAt: String
  }

  type Product {
    id: ID
    productId: ID
    inventoryId: ID
    productType: String!
    productName: String!
    unitPrice: Float!
    discountPercent: Float
    supplier: String
    photo: String
    buyQuantity: Int
  }

  type Payment {
    id: ID
    memberId: ID
    products: [Product]
    memberName: String
    membershipType: String
    createdAt: String
    total: Float!
    collected: Float
    change: Float
    term: String
    paymentMethod: String!
  }

  type Inventory {
    id: ID
    productId: String!
    unitPrice: Float!
    discountPercent: Float
    productType: String!
    productName: String!
    quantity: Int!
    supplier: String
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

  type ProductResponse {
    errors: Error
    data: Product
  }

  type ListProductResponse {
    errors: Error
    data: [Product]
  }

  type ListInventoryResponse {
    errors: Error
    data: [Inventory]
  }

  type TextResponse {
    errors: Error
    data: String
  }

  type VisitHistory {
    id: ID
    memberId: ID
    date: String
    memberName: String
  }

  type VisitHistoryResponse {
    errors: Error
    data: [VisitHistory]
  }

  type PaymentsResponse {
    errors: Error
    data: [Payment]
  }

  type MembershipType {
    id: ID!
    name: String!
    pricePerMonth: Float!
    discountPercent: Float!
  }

  type MembershipTypeResponse {
    errors: Error
    data: [MembershipType]
  }

  type Query {
    users: ListUserResponse
    user(username: String!): UserResponse
    me: UserResponse
    members: ListMemberResponse
    member(id: ID!): MemberResponse
    refreshToken: TextResponse
    logout: TextResponse
    products: ListProductResponse
    product(id: ID!): ProductResponse
    inventory: ListInventoryResponse
    visitHistory: VisitHistoryResponse
    payments: PaymentsResponse
    membershipTypes: MembershipTypeResponse
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
      newMembership: NewMembership
      payment: NewPayment
    ): TextResponse
    deleteMember(id: ID!): TextResponse
    holdMembership(id: ID!): TextResponse
    activateMembership(id: ID!, memberId: ID!): TextResponse
    addProduct(
      productType: String!
      productName: String!
      unitPrice: Float!
      discountPercent: Float!
      photo: String
      supplier: String
    ): TextResponse
    updateProduct(
      id: ID!
      productType: String!
      productName: String!
      unitPrice: Float!
      discountPercent: Float!
      photo: String
      supplier: String
    ): TextResponse
    deleteProduct(id: ID!): TextResponse
    stockIn(productId: String!, quantity: Int!): TextResponse
    addPayment(
      products: [ProductInput]!
      paymentMethod: String!
      memberId: String
      change: Float
      collected: Float
      total: Float!
    ): TextResponse
    checkIn(memberId: ID!): TextResponse
    addMembershipType(
      name: String!
      pricePerMonth: Float!
      discountPercent: Float!
    ): TextResponse
    deleteMembershipType(id: ID!): TextResponse
    updateMembershipType(
      id: ID!
      name: String!
      pricePerMonth: Float!
      discountPercent: Float!
    ): TextResponse
    updateUser(
      id: ID!
      firstName: String!
      lastName: String!
      phoneNumber: String
      email: String
      photo: String
    ): TextResponse
    changePassword(
      id: ID!
      password: String!
      currentPassword: String!
    ): TextResponse
  }
`;
//# sourceMappingURL=typeDefs.js.map