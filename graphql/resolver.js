const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = {
  Query: {
    User: () => {
      return {
        name: "Brian",
        email: "brian@applab.do",
        password: "123456",
      };
    },
  },
  Mutation: {
    addBook: (parent, { booksInput }, context, info) => {
      return { title: booksInput.title, genre: booksInput.genre };
    },
    createUser: async (parent, { userInput }) => {
      const hashedPassword = await bcrypt.hash(userInput.password, 12);

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
