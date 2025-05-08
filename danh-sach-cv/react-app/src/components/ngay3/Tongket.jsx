        import React, { useState, useEffect } from 'react';
        import axios from 'axios';
        import styles from '../../styles/App.module.css';
        import ExpenseForm from './ExpenseForm';
        import ExpenseList from './ExpenseList';

        const API_URL = 'http://localhost:5000/api/expenses';

        function Tongket3() {
        const [expenses, setExpenses] = useState([]);
        const [editingExpense, setEditingExpense] = useState(null);

    // 📥 Load từ localStorage hoặc từ API khi khởi động
    useEffect(() => {
        const storedExpenses = localStorage.getItem('expenses');
        if (storedExpenses) {
        setExpenses(JSON.parse(storedExpenses));
        } else {
        axios.get(API_URL)
            .then(res => setExpenses(res.data))
            .catch(err => console.error("Lỗi tải dữ liệu:", err));
        }
    }, []);

    // 💾 Lưu vào localStorage mỗi khi expenses thay đổi
    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

        // Tính tổng
        const total = expenses.reduce((sum, e) => sum + e.amount, 0);

        // Thêm mới
        const addExpense = async (expense) => {
            try {
            const res = await axios.post(API_URL, expense);
            setExpenses(prev => [res.data, ...prev]);
            } catch (err) {
            console.error("Lỗi thêm expense:", err);
            }
        };

        // Cập nhật
        const updateExpense = async (id, updatedData) => {
            try {
            const res = await axios.put(`${API_URL}/${id}`, updatedData);
            setExpenses(prev => prev.map(e => e._id === id ? res.data : e));
            setEditingExpense(null);
            } catch (err) {
            console.error("Lỗi cập nhật:", err);
            }
        };

        // Xoá
        const deleteExpense = async (id) => {
            try {
            await axios.delete(`${API_URL}/${id}`);
            setExpenses(prev => prev.filter(e => e._id !== id));
            } catch (err) {
            console.error("Lỗi xoá:", err);
            }
        };

        return (
            <div className={styles.container}>
            <h1>Quản lý Chi tiêu Cá nhân </h1>
            <ExpenseForm onSubmit={editingExpense ? updateExpense : addExpense} editing={editingExpense} />
            <ExpenseList
                expenses={expenses}
                onEdit={setEditingExpense}
                onDelete={deleteExpense}
                total={total}
            />
            </div>
        );
        }

        export default Tongket3;
