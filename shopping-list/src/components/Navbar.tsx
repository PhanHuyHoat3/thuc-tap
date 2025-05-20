'use client';

import { AppBar, Toolbar, Button } from '@mui/material';
import Link from 'next/link';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}
      >
        <Button color="inherit" component={Link} href="/">
          Home
        </Button>
        <Button color="inherit" component={Link} href="/items">
          Items
        </Button>
        <Button color="inherit" component={Link} href="/items/new">
          Add Item
        </Button>
      </Toolbar>
    </AppBar>
  );
}
