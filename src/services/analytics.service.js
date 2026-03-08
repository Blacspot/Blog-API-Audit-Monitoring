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

exports.getTopAuthors = async () => {
    const result = await Post.aggregate([
        {
            $group: {
                _id: "$author",
                totalPosts: { $sum: 1 }
            }
        },
        { $sort: { totalPosts: -1 } },
        { $limit: 5 }
    ]);
    return result;
}

exports.getPostsByDateRange = async (startDate, endDate) => {
    const result = await Post.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            }
        },
        {
            $group: {
                _id: "$category",
                totalPosts: { $sum: 1}
            }
        }
    ]);
    return result;
};
    