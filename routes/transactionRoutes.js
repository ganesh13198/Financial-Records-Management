// routes/transactionRoutes.js
import express from 'express';
import { 
    addTransaction, 
    getTransactions, 
    getTransactionById, 
    updateTransaction, 
    deleteTransaction, 
    getSummary 
} from '../controllers/transactionController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', authMiddleware, addTransaction);
router.get('/', authMiddleware, getTransactions);
router.get('/:id', authMiddleware, getTransactionById);
router.put('/:id', authMiddleware, updateTransaction);
router.delete('/:id', authMiddleware, deleteTransaction);
router.get('/summary', authMiddleware, getSummary);

export default router;
