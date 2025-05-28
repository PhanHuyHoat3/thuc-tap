    // /lib/apollo.ts
    import { ApolloClient, InMemoryCache } from '@apollo/client';

    export const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    cache: new InMemoryCache({
        typePolicies: {
        Query: {
            fields: {
            posts: {
                merge: false,
            },
            },
        },
        },
    }),
    defaultOptions: {
        watchQuery: { errorPolicy: 'all' },
        query: { errorPolicy: 'all' },
        mutate: { errorPolicy: 'all' },
    },
    });
