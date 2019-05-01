const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        required: 'Please provide your name'
    },
    email: {
        type: String,
        required:'Please provide your email address'
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('login', UserSchema);

module.exports = User;