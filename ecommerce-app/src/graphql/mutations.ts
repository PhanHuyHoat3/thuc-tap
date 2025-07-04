    import { gql } from '@apollo/client';

    export const CREATE_PRODUCT = gql`
    mutation CreateProduct($input: CreateProductInput!) {
        createProduct(input: $input) {
        id
        title
        description
        price
        imageUrl
        }
    }
    `;

    export const UPDATE_PRODUCT = gql`
    mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
        updateProduct(id: $id, input: $input) {
        id
        title
        description
        price
        imageUrl
        }
    }
    `;

    export const DELETE_PRODUCT = gql`
    mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id)
    }
    `;

    export const CREATE_COMMENT = gql`
    mutation CreateComment($input: CreateCommentInput!) {
        createComment(input: $input) {
        id
        productId
        userId
        content
        createdAt
        }
    }
    `;