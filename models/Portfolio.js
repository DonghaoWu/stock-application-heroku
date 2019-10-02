const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    age: {
        type: Number,
    },
    bio: {
        type: String,
    },
    shareholding:[
        {
            name:{
                type:String,
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
            }
        }
    ]
})

module.exports = Portfolio = mongoose.model('Portfolio', PortfolioSchema);