    // components/ClientProvidersWrapper.tsx
    'use client';

    import AuthProvider from './AuthProvider';
    import Navbar from './Navbar';
import { ReactQueryProvider } from './ReactQueryProvider';

    export default function ClientProvidersWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider>
        <AuthProvider>
            <Navbar />
            {children}
        </AuthProvider>
        </ReactQueryProvider>
    );
    }
