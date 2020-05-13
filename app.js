require("dotenv").config();
const express = require("express");
const path = require("path");
// const logger = require("morgan");
const bodyParser = require("body-parser");
const { ApolloServer, gql } = require("apollo-server-express");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolver");
const mongoose = require("mongoose");

const app = express();

// app.use(logger("dev"));
app.use(bodyParser.json());

const schema = gql`
  type Query {
    me: User
  }

  type User {
    username: String!
  }
`;

const resolvers = {
  Query: {
    me: () => {
      return {
        username: "Robin Wieruch",
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs: graphqlSchema,
  resolvers: graphqlResolver,
});

server.applyMiddleware({ app, path: "/graphql" });

mongoose
  .connect(
    "mongodb+srv://brian:jlz88KiWGAXRQ3lJ@cluster0-5nf18.mongodb.net/poll?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    app.listen(process.env.PORT, () => {
      console.log("server running on port 5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
