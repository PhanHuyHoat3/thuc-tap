    import React from 'react';
    import ExpenseItem from './ExpenseItem';
import styles from '../../styles/ExpenseList.module.css';


    function ExpenseList({ expenses, onEdit, onDelete, total }) {
    return (
        <div className={styles.listContainer}>
        <h3>Danh sách khoản chi ({expenses.length})</h3>
        {expenses.length === 0 && <p>Không có khoản chi nào.</p>}
        {expenses.map(exp => (
            <ExpenseItem
            key={exp._id}
            expense={exp}
            onEdit={onEdit}
            onDelete={onDelete}
            />
        ))}
        <div className={styles.total}>
            <strong>Tổng chi:</strong> {total.toLocaleString()} ₫
        </div>
        </div>
    );
    }

    export default ExpenseList;
