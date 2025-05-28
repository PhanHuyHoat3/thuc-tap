    import { gql } from '@apollo/client';

    export const GET_BOOKS = gql`
    query GetBooks {
        posts {
        data {
            id
            title
            body
        }
        }
    }
    `;

    export const GET_BOOK = gql`
    query GetBook($id: ID!) {
        post(id: $id) {
        id
        title
        body
        }
    }
    `;