'use client';

import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <Navbar />
            <main className="container mx-auto p-4">{children}</main>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
