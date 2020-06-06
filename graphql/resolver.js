const bcrypt = require("bcrypt");
const User = require("../models/User");
const Survey = require("../models/Survey");
const Message = require("../models/Message");
const jwt = require("jsonwebtoken");
const io = require("../socket");
const authResolver = require('./Auth')

module.exports = {
  Query: {
    /**
     * Auth Resolver
     */
    ...authResolver,
    getMessages: async (parent, args, { req }, info) => {
      if (!req) {
        const error = new Error("Not authenticated");
        error.code = 401;
        throw error;
      }
      const messages = await Message.find({}).populate("user");

      return messages;
    },
  },
  Mutation: {
    createUser: async (parent, { userInput }) => {
      const hashedPassword = await bcrypt.hash(userInput.password, 12);

      const invalidEmail = await User.findOne({ email: userInput.email });
      console.log("invalidEmail", invalidEmail);
      if (invalidEmail) {
        const error = new Error("Email is already taken.");
        error.code = 422;
        throw error;
      }

      const user = new User({
        name: userInput.name,
        email: userInput.email,
        password: hashedPassword,
        profilePic: userInput.profilePic,
      });

      await user.save();

      return true;
    },
    createSurvey: async (parent, { surveyInput }, { req }) => {
      const survey = new Survey({
        name: surveyInput.name,
        questionsQuantity: surveyInput.questionsQuantity,
      });

      await survey.save();

      return {
        ...survey._doc,
        _id: survey._id.toString(),
      };
    },
    sendMessage: async (parent, { message }, { req }) => {
      // const user = await User.findById(req.userId);

      try {
        if (!req.userId) {
          const error = new Error("Not authenticated");
          error.code = 401;
          throw error;
        }

        const newMessage = new Message({
          user: req.userId,
          message,
        });

        await newMessage.save();
        // await console.log(newMessage.populate("user").execPopulate());

        await newMessage.populate("user").execPopulate();
        io.getIO().emit("messageSent", { newMessage });
      }
      catch (error) {
        throw error;
      }

      return {
        ...newMessage._doc,
        _id: newMessage._id.toString(),
        createdAt: newMessage.createdAt.toISOString(),
        updatedAt: newMessage.updatedAt.toISOString(),
      };
    },
  },
};

// const user = require("../models/User");

// module.exports = {
//   createUser: ({ signUpInput }, req) => {
//     return {
//       name: signUpInput.name,
//       email: signUpInput.email,
//       password: signUpInput.password,
//     };
//   },
//   message: ({ message }, req) => {
//     return message.toUpperCase();
//   },
// };
