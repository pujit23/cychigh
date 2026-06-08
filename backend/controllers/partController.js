// ==============================================
// CycHigh — Part Controller (Glossary / Parts)
// ==============================================

import Part from '../models/Part.js';

// @desc    Get all parts
// @route   GET /api/parts
// @access  Public
export const getParts = async (req, res, next) => {
    try {
        const { category, search, page = 1, limit = 20 } = req.query;
        const query = {};

        if (category) query.category = category;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        const total = await Part.countDocuments(query);
        const parts = await Part.find(query)
            .sort({ category: 1, name: 1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.status(200).json({
            success: true,
            count: parts.length,
            total,
            pages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            data: parts,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single part by slug
// @route   GET /api/parts/:slug
// @access  Public
export const getPartBySlug = async (req, res, next) => {
    try {
        const part = await Part.findOne({ slug: req.params.slug });
        if (!part) {
            res.status(404);
            throw new Error('Part not found');
        }
        res.status(200).json({ success: true, data: part });
    } catch (error) {
        next(error);
    }
};

// @desc    Get part categories
// @route   GET /api/parts/categories
// @access  Public
export const getPartCategories = async (req, res, next) => {
    try {
        const categories = await Part.distinct('category');
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        next(error);
    }
};

// @desc    Create a part
// @route   POST /api/parts
// @access  Admin
export const createPart = async (req, res, next) => {
    try {
        const part = await Part.create(req.body);
        res.status(201).json({ success: true, data: part });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a part
// @route   PUT /api/parts/:id
// @access  Admin
export const updatePart = async (req, res, next) => {
    try {
        const part = await Part.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!part) {
            res.status(404);
            throw new Error('Part not found');
        }
        res.status(200).json({ success: true, data: part });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a part
// @route   DELETE /api/parts/:id
// @access  Admin
export const deletePart = async (req, res, next) => {
    try {
        const part = await Part.findByIdAndDelete(req.params.id);
        if (!part) {
            res.status(404);
            throw new Error('Part not found');
        }
        res.status(200).json({ success: true, message: 'Part deleted' });
    } catch (error) {
        next(error);
    }
};
