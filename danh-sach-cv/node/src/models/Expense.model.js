    const mongoose = require('mongoose');

    const expenseSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    amount: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true },
    category: { type: String, enum: ['Thực phẩm', 'Giao thông', 'Giải trí'], required: true }
    }, { timestamps: true });

    module.exports = mongoose.model('Expense', expenseSchema);
