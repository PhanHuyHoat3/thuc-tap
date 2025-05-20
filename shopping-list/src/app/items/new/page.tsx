    'use client';

    import { useState } from 'react';
    import { useRouter } from 'next/navigation';
    import { Container, Typography, TextField, Button, Grid } from '@mui/material';

    export default function NewItemPage() {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        const newItem = {
        id: Date.now().toString(),
        name,
        quantity,
        purchased: false,
        };

        // Lưu vào localStorage
        const stored = localStorage.getItem('shopping_items');
        const items = stored ? JSON.parse(stored) : [];
        items.unshift(newItem);
        localStorage.setItem('shopping_items', JSON.stringify(items));

        // Chuyển về trang danh sách
        router.push('/items');
    };

    return (
        <Container>
        <Typography variant="h5" sx={{ my: 2 }}>
            Add New Item
        </Typography>
        <form onSubmit={handleSubmit}>
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
        </Container>
    );
    }
