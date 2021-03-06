const { gql } = require('apollo-server-express');

const typeDefs = gql`\
    type User {
        id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Book {
        bookId: String
        authors: [String]
        title: String
        description: String
        image: String
        link: String
    }

    type InputBook {
        bookId: String
        authors: [String]
        title: String!
        description: String!
        image: String
        link: String
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(name: String!, email: String!, password: String!): Auth
        addBook(authors: [String], description: String, title: String, bookId: String, image: String, link: String): User
        removeBook(bookId: String!): User
    }
    `;

module.exports = typeDefs;