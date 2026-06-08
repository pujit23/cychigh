// ==============================================
// CycHigh — Part Routes
// ==============================================

import express from 'express';
import {
    getParts,
    getPartBySlug,
    getPartCategories,
    createPart,
    updatePart,
    deletePart,
} from '../controllers/partController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/categories', getPartCategories);
router.get('/', getParts);
router.get('/:slug', getPartBySlug);

// Admin-only routes
router.post('/', protect, createPart);
router.put('/:id', protect, updatePart);
router.delete('/:id', protect, deletePart);

export default router;
