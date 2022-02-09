const { gql } = require('apollo-server-express');

const typeDefs = gql`\
    type User {
        id: ID!
        name: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Book {
        bookId: ID!
        author: [String]
        title: String
        description: String
        image: String
        link: String
    }

    type InputBook {
        bookId: String
        authors: [String]
        title: String
        description: String
        image: String
        link: String
    }

    type Query {
        getUser: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        register(name: String!, email: String!, password: String!): Auth
        addBook(book: InputBook!): User
        removeBook(bookId: String!): User
    }
    `;

module.exports = typeDefs;