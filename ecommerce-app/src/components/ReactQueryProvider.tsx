    // components/ProvidersWrapper.tsx
    'use client';

    import Providers from './Providers';

    export default function ProvidersWrapper({
    children,
    }: {
    children: React.ReactNode;
    }) {
    return <Providers>{children}</Providers>;
    }
