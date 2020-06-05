const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    profilePic: String
  }

  type Survey {
    _id: ID!
    name: String!
    questionsQuantity: Int!
  }

  type Message {
    _id: ID!
    user: User!
    createdAt: String!
    updatedAt: String!
    message: String!
  }

  type AuthData {
    token: String
  }

  type userData {
    name: String!
    email: String!
    password: String!
    profilePic: String
  }

  input userInput {
    name: String!
    email: String!
    password: String!
    profilePic: Upload
  }

  input createSurveyInput {
    name: String!
    questionsQuantity: Int!
  }

  type Mutation {
    createUser(userInput: userInput): Boolean!
    createSurvey(surveyInput: createSurveyInput): Survey!
    sendMessage(message: String!): Message!
    editUser(userInput: userInput): userData!
  }

  type Query {
    login(email: String!, password: String!): AuthData!
    currentUser: User!
    getMessages: [Message]!
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
