// ==============================================
// CycHigh — Glossary Routes (aliases to Parts)
// ==============================================

import express from 'express';
import {
    getParts,
    getPartBySlug,
    getPartCategories,
} from '../controllers/partController.js';

const router = express.Router();

// Glossary is a public-facing alias for parts
router.get('/categories', getPartCategories);
router.get('/', getParts);
router.get('/:slug', getPartBySlug);

export default router;
