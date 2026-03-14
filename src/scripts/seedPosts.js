require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/user.model');
const Post = require('../models/post.model');

const categories = ['Tech', 'Travel', 'Lifestyle', 'Food', 'Education'];
const titles = [
    'Learning Node.js', 'MongoDB Aggregation Guide',
    'Top Travel Destinations', 'Healthy Lifestyle Tips', 'How to Learn Programming'
];
const seedUsers = [
    { firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', username: 'alice', password: 'password123', role: 'user' },
    { firstName: 'John',  lastName: 'Doe',   email: 'john@example.com',  username: 'john',  password: 'password123', role: 'user' },
    { firstName: 'Mary',  lastName: 'Jane',  email: 'mary@example.com',  username: 'mary',  password: 'password123', role: 'user' },
    { firstName: 'Admin', lastName: 'User',  email: 'admin@example.com', username: 'admin', password: 'adminpass123', role: 'admin' },
];

function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomDate() {
    const start = new Date(2023, 0, 1);
    return new Date(start.getTime() + Math.random() * (Date.now() - start.getTime()));
}

async function seedPosts() {
    try {
        await connectDB();

        await Post.deleteMany();
        await User.deleteMany();
        console.log('Cleared existing collections');

        const createdUsers = await User.create(seedUsers);
        console.log(`Created ${createdUsers.length} users (including 1 admin)`);

        const posts = Array.from({ length: 100 }, () => ({
            title:     randomItem(titles),
            content:   'This is a sample blog post content.',
            category:  randomItem(categories),
            author:    randomItem(createdUsers)._id,  // Real ObjectId reference
            createdAt: randomDate()
        }));

        await Post.insertMany(posts);
        console.log('100 sample posts seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
}

seedPosts();