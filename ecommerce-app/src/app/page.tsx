  'use client';
  import { useRouter } from 'next/navigation';
  import { Button, Container, Typography } from '@mui/material';

  export default function Home() {
    const router = useRouter();
    return (
      <Container>
        <Typography variant="h4">E-commerce App</Typography>
        <Button onClick={() => router.push('/products')}>Xem sản phẩm</Button>
      </Container>
    );
  }
