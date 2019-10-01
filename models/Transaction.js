const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    action: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    quantitu: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
})

module.exports = Transaction = mongoose.model('transaction', TransactionSchema);