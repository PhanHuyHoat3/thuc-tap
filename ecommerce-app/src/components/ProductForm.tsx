    'use client';
    import { useState } from 'react';
    import { TextField, Button, Grid } from '@mui/material';
    import { useMutation } from 'react-query';
    import { Product } from '@/types/Product';

    export default function ProductForm({
    initialData,
    onSubmit,
    }: {
    initialData?: Product;
    onSubmit: (data: Product) => void;
    }) {
    const [formData, setFormData] = useState<Product>(
        initialData || { title: '', description: '', price: 0, imageUrl: '' }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form
        onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
        }}
        >
        <Grid container spacing={2} sx={{ maxWidth: 500 }}>
            <Grid item xs={12}>
            <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                type="number"
                fullWidth
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                fullWidth
                label="Image URL"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
            />
            </Grid>
            <Grid item xs={12}>
            <Button type="submit" variant="contained">
                Submit
            </Button>
            </Grid>
        </Grid>
        </form>
    );
    }
