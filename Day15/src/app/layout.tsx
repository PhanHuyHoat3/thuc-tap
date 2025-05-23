import './globals.css';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Product Catalog',
  description:
    'Explore our range of products with detailed descriptions and images',
  openGraph: {
    title: 'Product Catalog',
    description:
      'Explore our range of products with detailed descriptions and images',
    images: ['/images/product-1.jpg'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
