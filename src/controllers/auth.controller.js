const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, username } = req.body;

        const existingUser = await User.findOne({ email});
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists'});
        }

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password,
            username
        });

        res.status(201).json({ message: 'User registered successfully'});

    }  catch (error) {
        res.status(500).json({ message: error.message});
    }
};
const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ email});
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials'});
        }

        const token = jwt.sign(
            { id: user._id, role: user.role},
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        );

        res.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

// Add at the bottom of auth.controller.js
module.exports = { signup, login };