//this file contains the business logic for the analytics routes

const Post = require("../models/post.model");
exports.getPostsPerCategory = async () => {
    const result = await Post.aggregate([
    {
        $group: {
            _id: "$category",
            totalPosts: { $sum: 1 }
        }
    }
    ]);
    return result;
};

exports.getPostsPerMonth = async () => {
    const result = await Post.aggregate([
        {
            $group: {
                _id: { $month: "$createdAt"},
                totalPosts: { $sum: 1 }
            }
        }
    ]);
    return result;
};
    