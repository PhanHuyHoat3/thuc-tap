    // src/schema.js
    const { gql } = require('graphql-tag');

    const typeDefs = gql`
    type Book {
        id: ID!
        title: String!
        author: String!
        publishedYear: Int!
    }

    input BookInput {
        title: String!
        author: String!
        publishedYear: Int!
    }

    type Query {
        books: [Book!]!
        book(id: ID!): Book
    }

    type Mutation {
        createBook(input: BookInput!): Book!
        updateBook(id: ID!, input: BookInput!): Book!
        deleteBook(id: ID!): Book!
    }
    `;

    module.exports = { typeDefs };