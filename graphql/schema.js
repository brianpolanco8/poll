const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    User: User!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    profilePic: String
  }

  type Book {
    title: String!
    genre: String!
  }

  type Mutation {
    addBook(booksInput: BooksInput!): Book!
    createUser(userInput: createUserInput): User!
  }

  input createUserInput {
    name: String!
    email: String!
    password: String!
    profilePic: String
  }

  input BooksInput {
    title: String!
    genre: String!
  }
`;

// const { buildSchema } = require("graphql");

// module.exports = buildSchema(`

// type User {
//     _id: ID!
//     name: String!
//     email: String!
//     password: String!
// }

// input CreateUserInput {
//     name: String!
//     email: String!
//     password: String!
// }

// type RootMutation {
//     createUser(signUpInput: CreateUserInput): User!
// }

// type RootQuery {
//     message(message: String!): String!
// }

// schema {
//     query: RootQuery
//     mutation: RootMutation
// }

// `);
