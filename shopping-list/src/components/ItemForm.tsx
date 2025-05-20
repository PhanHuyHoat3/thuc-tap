'use client';

import { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import styles from '@/styles/ItemForm.module.css';
import { Item } from '@/types/Item';

interface Props {
  onAddItem: (item: Item) => void;
}

export default function ItemForm({ onAddItem }: Props) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newItem: Item = {
      id: Date.now().toString(),
      name,
      quantity,
      purchased: false,
    };

    onAddItem(newItem);
    setName('');
    setQuantity(1);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(+e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained">
            Add Item
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
