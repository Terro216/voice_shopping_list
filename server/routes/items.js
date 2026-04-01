import express from 'express';
import { getItems, addItem, incrementItem, decrementItem, deleteItem } from '../controllers/itemsController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getItems);
// Require token for modifications
router.post('/', verifyToken, addItem);
router.put('/:id/increment', verifyToken, incrementItem);
router.put('/:id/decrement', verifyToken, decrementItem);
router.delete('/:id', verifyToken, deleteItem);

export default router;
