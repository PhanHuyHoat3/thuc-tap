import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata = {
  title: 'Todo App',
  description: 'A simple todo app built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
