const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Transaction = require('../../models/Transaction');
const User = require('../../models/User');
const axios = require('axios');

// @route  GET api/stock
// @desc   Get all stock data
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const data = {
            value: 0,
            stock: [],
        };
        for (let i = 0; i < user.shareholding.length; i++) {
            let apiIndivitual = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${user.shareholding[i].name}&apikey=5F53S1QWA484BWTH`);
            if (apiIndivitual.data) {
                data.stock.push([user.shareholding[i].quantity, apiIndivitual.data['Global Quote']]);
                data.value += Number(apiIndivitual.data['Global Quote']['05. price'] * user.shareholding[i].quantity);
            }
        }
        // console.log(data);
        res.json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;