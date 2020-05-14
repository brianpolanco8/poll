const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  Query: {
    login: async (parent, { email, password }, { req }, info) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        const error = new Error("Email doesn't exists");
        error.code = 401;
        throw error;
      }

      const compare = await bcrypt.compare(password, user.password);

      if (!compare) {
        const error = new Error("Credentials don't match");
        error.code = 401;
        throw error;
      }

      const token = await jwt.sign(
        {
          user,
          id: user._id,
        },
        `${process.env.TOKEN_SECRET}`,
        {
          algorithm: `${process.env.TOKEN_ALGORITHM}`,
        }
      );

      return {
        token,
      };
    },
  },
  Mutation: {
    createUser: async (parent, { userInput }) => {
      const hashedPassword = await bcrypt.hash(userInput.password, 12);

      const invalidEmail = await User.find({ email: userInput.email });
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

      return {
        ...user._doc,
        _id: user._id.toString(),
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
