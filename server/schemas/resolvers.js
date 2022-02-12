const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
                return userData;
            }
            throw new AuthenticationError('You are not logged in!')
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('User not found');
            }

            const isValidPassword = await user.isCorrectPassword(password);

            if (!isValidPassword) {
                throw new AuthenticationError('Invalid password');
            }

            const token = signToken(user);

            return { token, user };
        },
        addBook: async (parent, args, context) => {
            if (!context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: newBook } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You are not logged in!');
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You are not logged in!');
        },
    },
};

module.exports = resolvers;
