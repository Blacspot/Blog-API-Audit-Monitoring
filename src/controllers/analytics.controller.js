const Post = require("../models/post.model");
const analyticsService = require("../services/analytics.service");

exports.postsPerCategory = async (req, res) => {
    try {
        const data = await analyticsService.getPostsPerCategory();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.postsPerMonth = async (req, res) => {
    try {
        const data = await analyticsService.getPostsPerMonth();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.topAuthors = async (req, res) => {
    try {
        const data = await analyticsService.getTopAuthors();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.postsByDateRange = async (req, res) => {

    try {

        const { startDate, endDate } = req.query;

        const data = await analyticsService.getPostsByDateRange(startDate, endDate);

        res.json(data);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};