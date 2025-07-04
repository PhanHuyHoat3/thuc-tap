// app/layout.tsx
import NavbarWrapper from '@/components/NavbarWrapper';
import ProvidersWrapper from '@/components/ReactQueryProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProvidersWrapper>
          <NavbarWrapper />
          {children}
        </ProvidersWrapper>
      </body>
    </html>
  );
}
