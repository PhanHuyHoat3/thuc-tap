    'use client';

    import { ReactNode } from 'react';
    import { SessionProvider } from 'next-auth/react';
    import { ApolloProvider } from '@apollo/client';
    import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
    import { client } from '@/lib/apolloClient';

    const queryClient = new QueryClient();

    export default function Providers({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
        <ApolloProvider client={client}>
            <QueryClientProvider client={queryClient}>
            {children}
            </QueryClientProvider>
        </ApolloProvider>
        </SessionProvider>
    );
    }
