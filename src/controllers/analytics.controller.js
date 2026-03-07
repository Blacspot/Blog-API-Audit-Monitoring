const Post = require("../models/post.model");

exports.postsPerCategory = async (req, res) => {
    try {
        const result = await Post.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalPosts: { $sum: 1 }
                }
            }
        ]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};