const Build = require('../models/Build');

// @desc    Get user builds
// @route   GET /api/builds
// @access  Private
const getBuilds = async (req, res, next) => {
    try {
        const builds = await Build.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(builds);
    } catch (error) {
        next(error);
    }
};

// @desc    Get user builds (public profile)
// @route   GET /api/users/:id/builds
// @access  Public
const getUserBuilds = async (req, res, next) => {
    try {
        const builds = await Build.find({ user: req.params.id }).sort({ createdAt: -1 });
        res.json(builds);
    } catch (error) {
        next(error);
    }
};

// @desc    Create a build
// @route   POST /api/builds
// @access  Private
const createBuild = async (req, res, next) => {
    try {
        const build = new Build({
            ...req.body,
            user: req.user._id
        });

        const createdBuild = await build.save();
        res.status(201).json(createdBuild);
    } catch (error) {
        next(error);
    }
};

// @desc    Get build by ID
// @route   GET /api/builds/:id
// @access  Public
const getBuildById = async (req, res, next) => {
    try {
        const build = await Build.findById(req.params.id).populate('user', 'username avatar');

        if (build) {
            res.json(build);
        } else {
            res.status(404);
            throw new Error('Build not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Update a build
// @route   PUT /api/builds/:id
// @access  Private
const updateBuild = async (req, res, next) => {
    try {
        const build = await Build.findById(req.params.id);

        if (build) {
            if (build.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
                res.status(401);
                throw new Error('Not authorized to update this build');
            }

            Object.assign(build, req.body);
            const updatedBuild = await build.save();
            res.json(updatedBuild);
        } else {
            res.status(404);
            throw new Error('Build not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a build
// @route   DELETE /api/builds/:id
// @access  Private
const deleteBuild = async (req, res, next) => {
    try {
        const build = await Build.findById(req.params.id);

        if (build) {
            if (build.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
                res.status(401);
                throw new Error('Not authorized to delete this build');
            }
            await Build.deleteOne({ _id: build._id });
            res.json({ message: 'Build removed' });
        } else {
            res.status(404);
            throw new Error('Build not found');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { getBuilds, getUserBuilds, createBuild, getBuildById, updateBuild, deleteBuild };
