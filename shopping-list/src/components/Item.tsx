'use client';

import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Item as ItemType } from '@/types/Item';
import styles from '@/styles/Item.module.css';

interface Props {
  item: ItemType;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function Item({ item, onDelete, onToggle }: Props) {
  return (
    <Card className={styles.itemCard}>
      <CardContent>
        <Typography variant="h6" component="div">
          <Checkbox
            checked={item.purchased}
            onChange={() => onToggle(item.id)}
          />
          {item.name} - {item.quantity}
        </Typography>
        <IconButton color="primary">
          <Edit />
        </IconButton>
        <IconButton color="secondary" onClick={() => onDelete(item.id)}>
          <Delete />
        </IconButton>
      </CardContent>
    </Card>
  );
}
