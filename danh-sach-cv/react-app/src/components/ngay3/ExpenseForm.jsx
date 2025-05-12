        import { useState, useEffect } from 'react';
        import styles from '../../styles/ExpenseForm.module.css';

        export default function ExpenseForm({ onSubmit, editing }) {
        const [form, setForm] = useState({ name: '', amount: '', date: '', category: '' });
        const [errors, setErrors] = useState({});

        useEffect(() => {
            if (editing) setForm(editing);
        }, [editing]);

const validate = () => {
    const errs = {};
    if (!form.name || form.name.length < 3) errs.name = 'Tên khoản chi ít nhất 3 ký tự';
    if (!form.amount || +form.amount <= 0) errs.amount = 'Số tiền phải > 0';
    if (!form.date || new Date(form.date) > new Date()) errs.date = 'Ngày không hợp lệ';
    if (!form.category) errs.category = 'Chọn danh mục';
    setErrors(errs);
    return Object.keys(errs).length === 0;
    };

        const handleSubmit = e => {
            e.preventDefault();
            if (!validate()) return;
            onSubmit({ ...form, amount: +form.amount });
            setForm({ name: '', amount: '', date: '', category: '' });
        };

        return (
            <form onSubmit={handleSubmit} className={styles.form}>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Tên khoản chi" />
            {errors.name && <span>{errors.name}</span>}
            
            <input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="Số tiền" />
            {errors.amount && <span>{errors.amount}</span>}
            
            <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            {errors.date && <span>{errors.date}</span>}
            
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                <option value="">Chọn danh mục</option>
                <option value="Thực phẩm">Thực phẩm</option>
                <option value="Giao thông">Giao thông</option>
                <option value="Giải trí">Giải trí</option>
            </select>
            {errors.category && <span>{errors.category}</span>}

            <button type="submit">{editing ? 'Cập nhật' : 'Thêm mới'}</button>
            </form>
        );
        }
