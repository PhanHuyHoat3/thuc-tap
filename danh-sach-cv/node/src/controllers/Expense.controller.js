    const Expense = require('../models/expense.model');

    exports.getAllExpenses = async (req, res) => {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
    };

    exports.createExpense = async (req, res) => {
    const { name, amount, date, category } = req.body;
    const newExpense = new Expense({ name, amount, date, category });
    await newExpense.save();
    res.status(201).json(newExpense);
    };

    exports.updateExpense = async (req, res) => {
    const { id } = req.params.id;
    const updated = await Expense.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
    };

    exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.status(204).end();
    };
