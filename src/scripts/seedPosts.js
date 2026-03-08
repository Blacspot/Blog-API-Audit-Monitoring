require("dotenv").config();

const mongoose = require("mongoose");
const Post = require("../models/post.model");

const connectDB = require("../config/db");

const authors = ["Alice", "John", "Mary", "David", "Sophia"];

const categories = ["Tech",
    "Travel",
    "Lifestyle",
    "Food",
    "Education"];

const titles = [
    "Learning Node.js",
    "MongoDB Aggregation Guide",
    "Top Travel Destinations",
    "Healthy Lifestyle Tips",
    "How to Learn Programming"
];

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate() {
    const start = new Date(2023, 0, 1);
    const end = new Date();

    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
}

async function seedPosts() {
    try {
        await connectDB();
        await Post.deleteMany();
        const posts = [];

        for (let i = 0; i < 100; i++) {
            posts.push({
                title: randomItem(titles),
                content: "This is a sample blog post content.",
                category: randomItem(categories),
                author: randomItem(authors),
                createdAt: randomDate()
            });
        }
        await Post.insertMany(posts);
        console.log("100 Sample Posts Seeded Successfully");
        process.exit();
    } catch (error) {
        console.error("Error Seeding Posts", error);
        process.exit(1);
    }
}
seedPosts();