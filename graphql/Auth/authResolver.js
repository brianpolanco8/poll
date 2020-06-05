const bcrypt = require("bcrypt");
const User = require("../../models/User");
const jwt = require('jsonwebtoken')

module.exports = {
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
    currentUser: async (parent, args, { req }, info) => {
        const user = await User.findById(req.userId);

        if (!user) {
            const error = new Error("Not user found");
            error.code = 401;
            throw error;
        }

        return { ...user._doc, _id: user._id.toString() };
    },
}