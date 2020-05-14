const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    profilePic: String
  }

  type AuthData {
    token: String
  }

  input createUserInput {
    name: String!
    email: String!
    password: String!
    profilePic: String
  }

  type Mutation {
    createUser(userInput: createUserInput): User!
  }

  type Query {
    login(email: String!, password: String!): AuthData!
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
