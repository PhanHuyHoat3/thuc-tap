    import { gql } from '@apollo/client';

    export const GET_PRODUCTS = gql`
    query GetProducts {
        posts {
        data {
            id
            title
            body
        }
        }
    }
    `;

    export const GET_PRODUCT = gql`
    query GetProduct($id: ID!) {
        post(id: $id) {
        id
        title
        body
        }
    }
    `;
