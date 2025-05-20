import Link from 'next/link';
import { Button, Container, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Container>
      <Typography variant="h3" sx={{ my: 4 }}>
        Welcome to Shopping List
      </Typography>
      <Button variant="contained" component={Link} href="/items">
        View Items
      </Button>
    </Container>
  );
}
