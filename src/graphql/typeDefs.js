const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Supplier {
    _id: ID!
    storeName: String
    phone: String
    productCategory: [String]
    products: [Product]
    description: String
    role: String
    website: String
    panNumber: String
    gstNumber: String
    isVerified: Boolean
    createdAt: String
    updatedAt: String
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    cart: [Product]
    role: String!
    orders: [Order]
    phone: String
    passwordResetToken: String
    passwordResetExpires: String
  }

  type Product {
    _id: ID!
    name: String!
    price: Float!
    description: String
    image: String
    type: ProductType!
    reviews: [String]
    ownerId: Supplier
    owner: OwnerType
    stock: Int
    category: String
    createdAt: String!
    updatedAt: String!
  }

  type Order {
    _id: ID!
    user: User!
    products: [Product]!
    total: Float!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    products: [Product!]!
  }

  input createProductInput {
    name: String!
    price: Float!
    description: String
    image: String
    type: String
    reviews: [String]
    owner: OwnerType,
    stock: Int
    ownerId: ID
    category: String
  }

  type Mutation {
    createProduct(input: createProductInput!): Product
    deleteProduct(id: ID!): Product
  }

  enum ProductType {
    Shirt
    Pants
    Shoes
    Accessories
    Book
    SmartPhone
  }

  enum OwnerType {
    Admin
    Supplier
  }

`;

module.exports = { typeDefs };
