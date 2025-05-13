    // src/graphql/queries.js
    import { gql } from '@apollo/client';

    export const GET_BOOKS = gql`
    query GetBooks {
        books {
        id
        title
        author
        publishedYear
        }
    }
    `;

    export const GET_BOOK = gql`
    query GetBook($id: ID!) {
        book(id: $id) {
        id
        title
        author
        publishedYear
        }
    }
    `;

    export const CREATE_BOOK = gql`
    mutation CreateBook($input: BookInput!) {
        createBook(input: $input) {
        id
        title
        author
        publishedYear
        }
    }
    `;

    export const UPDATE_BOOK = gql`
    mutation UpdateBook($id: ID!, $input: BookInput!) {
        updateBook(id: $id, input: $input) {
        id
        title
        author
        publishedYear
        }
    }
    `;

    export const DELETE_BOOK = gql`
    mutation DeleteBook($id: ID!) {
        deleteBook(id: $id) {
        id
        }
    }
    `;