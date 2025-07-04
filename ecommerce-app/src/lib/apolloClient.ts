    import { ApolloClient, InMemoryCache } from "@apollo/client";

    export const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    cache: new InMemoryCache(),
    });

    export function getClient() {
    return client;
    }
