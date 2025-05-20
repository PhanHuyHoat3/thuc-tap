import { Container, Typography } from '@mui/material';
import React from 'react';

export default function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>
        Shopping Items
      </Typography>
      {children}
    </Container>
  );
}
