const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    balance: {
        type: Number,
        default: 5000
    },
    date: {
        type: Date,
        default: Date.now,
    },
    shareholding: [
        {
            symbol: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            cost: {
                type: Number,
                required: true,
            }
        }
    ]
});

module.exports = User = mongoose.model('user', UserSchema);