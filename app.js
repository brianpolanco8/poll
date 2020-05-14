require("dotenv").config();
const express = require("express");
const path = require("path");
// const logger = require("morgan");
const bodyParser = require("body-parser");
const { ApolloServer, gql } = require("apollo-server-express");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolver");
const mongoose = require("mongoose");
const auth = require("./middlewares/auth");

const app = express();

// app.use(logger("dev"));
app.use(bodyParser.json());

app.use(auth);

const server = new ApolloServer({
  typeDefs: graphqlSchema,
  resolvers: graphqlResolver,
  context: async ({ req }) => {
    return {
      req,
    };
  },
  formatError: (error) => {
    data = error.originalError.data;
    message = error.originalError.message;
    code = error.originalError.code || 500;
    if (!code) {
      code = 500;
    }
    error.custom = true;
    return { message, code };
  },
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
