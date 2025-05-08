import React from 'react';
    import styles from '../../styles/ExpenseItem.module.css';


    function ExpenseItem({ expense, onEdit, onDelete }) {
    return (
        <div className={styles.card}>
        <div className={styles.details}>
            <h4>{expense.name}</h4>
            <p>{new Date(expense.date).toLocaleDateString()}</p>
            <p>Danh mục: {expense.category}</p>
        </div>
        <div className={styles.amount}>
            <span>{expense.amount.toLocaleString()} ₫</span>
        </div>
        <div className={styles.actions}>
            <button onClick={() => onEdit(expense)}>✏️</button>
            <button onClick={() => onDelete(expense._id)}>🗑️</button>
        </div>
        </div>
    );
    }

    export default ExpenseItem;
