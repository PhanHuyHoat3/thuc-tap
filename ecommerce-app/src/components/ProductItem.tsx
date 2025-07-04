'use client';

import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { useRouter } from 'next/navigation';

type Post = {
  id: string;
  title: string;
  body: string;
};

export default function ProductItem({ product }: { product: Post }) {
  const router = useRouter();

  return (
    <Card>
      <CardActionArea onClick={() => router.push(`/products/${product.id}`)}>
        <CardContent>
          <Typography>{product.title}</Typography>
          <Typography>{product.body}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
