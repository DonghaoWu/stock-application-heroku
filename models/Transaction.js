const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    action: {
        type: String,
        required: true,
    },
    symbol: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    cost: {
        type: Number,
        required: true,
    }
})

module.exports = Transaction = mongoose.model('transaction', TransactionSchema);