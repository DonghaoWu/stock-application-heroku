const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Transaction = require('../../models/Transaction');
const User = require('../../models/User');

// @route  POST api/transactions
// @desc   Create a transaction, buy or sell stock shares
// @access Private
router.post('/',
    [auth,
        [
            check('action', 'Action is required').not().isEmpty(),
            check('symbol', 'Symbol is required').not().isEmpty(),
            check('quantity', 'Quantity is required').not().isEmpty(),
            check('price', 'Price is required').not().isEmpty(),
        ]
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { action, symbol, quantity, price } = req.body;
        const newCost = Number(price).toFixed(2) * quantity;

        const newTransaction = {
            symbol: symbol,
            quantity: Number(quantity),
            cost: newCost
        }

        try {
            let user = await User.findById(req.user.id).select('-password');
            let newBalance = user.balance - newCost;
            if (newBalance < 0) {
                return res.status(400).json({ msg: "Not enough cash!" })
            }

            let hasOne = false;
            for (let i = 0; i < user.shareholding.length; i++) {
                if (user.shareholding[i].symbol === newTransaction.symbol) {
                    user.shareholding[i].quantity += newTransaction.quantity;
                    user.shareholding[i].cost += newTransaction.cost;
                    hasOne = true;
                    break;
                }
            }
            if (!hasOne) user.shareholding.push(newTransaction);

            user.shareholding = user.shareholding.filter(el => {
                return el.quantity !== 0;
            });

            user.balance = newBalance.toFixed(2);

            await user.save();

            let transaction = new Transaction({
                user: req.user.id,
                action: action,
                symbol: symbol,
                quantity: quantity,
                price: price,
                cost: newCost
            })

            await transaction.save();
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }
);

// @route  GET api/transactions
// @desc   Get all posts
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;