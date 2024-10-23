// controllers/transactionController.js
import Transaction from '../models/Transaction.js';

export const addTransaction = async (req, res) => {
    const { type, category, amount, date, description } = req.body;
    try {
        const newTransaction = await Transaction.create({
            user: req.user.id,
            type,
            category,
            amount,
            date,
            description,
        });
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id });
        res.json(transactions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction || transaction.user.toString() !== req.user.id) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction || transaction.user.toString() !== req.user.id) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        Object.assign(transaction, req.body);
        await transaction.save();
        res.json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction || transaction.user.toString() !== req.user.id) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        
        await Transaction.deleteOne({ _id: req.params.id });
        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const getSummary = async (req, res) => {
    try {
        const { startDate, endDate, category } = req.query;

        // Build query object
        const query = {
            user: req.user.id,
        };

        // Add date range filter if provided
        if (startDate || endDate) {
            query.date = {};
            if (startDate) {
                query.date.$gte = new Date(startDate);
            }
            if (endDate) {
                query.date.$lte = new Date(endDate);
            }
        }

        // Add category filter if provided
        if (category) {
            query.category = category;
        }

        // Fetch transactions based on the query
        const transactions = await Transaction.find(query);

        // Calculate summary
        const summary = transactions.reduce((acc, transaction) => {
            if (transaction.type === 'income') {
                acc.totalIncome += transaction.amount;
            } else {
                acc.totalExpenses += transaction.amount;
            }
            return acc;
        }, { totalIncome: 0, totalExpenses: 0 });

        summary.balance = summary.totalIncome - summary.totalExpenses;

        // Send response
        res.json(summary);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
