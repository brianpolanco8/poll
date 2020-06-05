require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
// const logger = require("morgan");
const bodyParser = require("body-parser");
const { ApolloServer, gql } = require("apollo-server-express");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolver");
const mongoose = require("mongoose");
const auth = require("./middlewares/auth");
const AWS = require('aws-sdk')
const fs = require('fs')

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// })

// const params = {
//   Bucket: `${process.env.AWS_S3_BUCKET_NAME}`,
//   CreateBucketConfiguration: {
//     LocationConstraint: `${process.env.AWS_S3_BUCKET_REGION}`
//   }
// }

// const uploadFile = (fileName) => {
//   const fileContent = fs.readFileSync(fileName);
//   console.log(fileContent);

//   // const params = {
//   //   Bucket: `${process.env.AWS_S3_BUCKET_NAME}`,
//   //   Key: './Dockerfile',
//   //   Body: fileContent
//   // }

//   // s3.upload(params, (error, data) => {
//   //   if (error) {
//   //     throw error;
//   //   }
//   //   console.log('File upload successfuly', data)
//   // })
// }

// s3.createBucket(params, (err, data) => {

//   if (err) console.log(err, err.stack);
//   else console.log('Bucket created successfully', data)
// })

// uploadFile('./Dockerfile');

const app = express();

// app.use(logger("dev"));
app.use(cors());
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
    const server = app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`)
    });
    const io = require("./socket").init(server);
    io.on("connection", (socket) => {
      console.log("Client connected");
    });
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
