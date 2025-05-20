    'use client';

    import { useEffect, useState } from 'react';
    import { Grid } from '@mui/material';
    import Item from '@/components/Item';
    import ItemForm from '@/components/ItemForm';
    import { Item as ItemType } from '@/types/Item';

    export default function ItemListPage() {
    const [items, setItems] = useState<ItemType[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('shopping_items');
        if (stored) {
        setItems(JSON.parse(stored));
        }
    }, []);

    const updateLocalStorage = (updated: ItemType[]) => {
        localStorage.setItem('shopping_items', JSON.stringify(updated));
    };

    const addItem = (item: ItemType) => {
        const updated = [item, ...items];
        setItems(updated);
        updateLocalStorage(updated);
    };

    const deleteItem = (id: string) => {
        const updated = items.filter((i) => i.id !== id);
        setItems(updated);
        updateLocalStorage(updated);
    };

    const togglePurchased = (id: string) => {
        const updated = items.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
        );
        setItems(updated);
        updateLocalStorage(updated);
    };

    return (
        <>
        {/* Nếu muốn, giữ form ở đây */}
        {/* <ItemForm onAddItem={addItem} /> */}

        <Grid container spacing={2} sx={{ mt: 2 }}>
            {items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Item
                item={item}
                onDelete={deleteItem}
                onToggle={togglePurchased}
                />
            </Grid>
            ))}
        </Grid>
        </>
    );
    }
