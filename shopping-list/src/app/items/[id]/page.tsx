import { Typography } from '@mui/material';
import { notFound } from 'next/navigation';

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Simulated fetch
  const item = { id, name: 'Mock Item', quantity: 2, purchased: true };

  if (!item) return notFound();

  return (
    <>
      <Typography variant="h4">{item.name}</Typography>
      <Typography>Quantity: {item.quantity}</Typography>
      <Typography>Purchased: {item.purchased ? 'Yes' : 'No'}</Typography>
    </>
  );
}
