const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Transaction = require('../../models/Transaction');
const User = require('../../models/User');
const Porfolio = require('../../models/Portfolio')

// @route  POST api/transactions
// @desc   Create a transaction
// @access Private
router.post('/', [auth,
    [
        check('action', 'Action is required').not().isEmpty(),
        check('name', 'Name is required').not().isEmpty(),
        check('quantity', 'Quantity is required').not().isEmpty(),
        check('price', 'Price is required').not().isEmpty(),
    ]
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { action, name, quantity, price } = req.body;
        const newTra = {
            name: name,
            quantity: quantity,
        }

        try {
            let user = await User.findById(req.user.id).select('-password');
            let newBalance = user.balance - price * quantity;

            if (newBalance < 0) {
                return res.status(400).json({ msg: "Not enough cash!" })
            }
            let portfolio = await Porfolio.findOne({ user: req.user.id })
            if(!portfolio.shareholding.length) {
                portfolio.shareholding.push(newTra);
            }
            else{
                let arr = portfolio.shareholding;
                let hasOne = false;
                for(let i = 0; i < arr.length; i++){
                    if(arr[i].name === newTra.name){
                        hasOne = true;
                        arr[i].quantity += newTra.quantity;
                        break;
                    }
                }
                if(!hasOne) portfolio.shareholding.push(newTra);
            }
            await portfolio.save();

            user = await User.findOneAndUpdate({ _id: req.user.id }, { $set: { balance: newBalance } }, { new: true });

            let transaction = new Transaction({
                user: req.user.id,
                action: action,
                name: name,
                quantity: quantity,
                price: price
            })

            await transaction.save();
            res.json(transaction);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route  GET api/transactions
// @desc   Get all posts
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;