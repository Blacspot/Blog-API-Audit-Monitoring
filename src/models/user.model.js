const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: [true, 'Please enter your first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email address'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password']
    },
    // Add this field to userSchema
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
},
    {
        timestamps: true
    }
);

userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);
module.exports = User;