const express = require('express');

const { check, validationResult } = require('express-validator');

const authMiddleware = require('../../middleware/authMiddleware');
const finnhubClient = require('../../config/finhub');

const Transaction = require('../../models/Transaction');
const User = require('../../models/User');

const router = express.Router();

const fetchPricePromise = (symbol) => {
  return new Promise((resolve, reject) => {
    finnhubClient.quote(symbol, (error, data, response) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(data);
    });
  });
};

// @route  POST api/transactions
// @desc   Create a transaction, buy or sell stock shares
// @access Private
router.post(
  '/',
  [
    authMiddleware,
    [
      check('action', 'Action is required').not().isEmpty(),
      check('symbol', 'Symbol is required').not().isEmpty(),
      check('quantity', 'Quantity is required').not().isEmpty(),
      check('price', 'Price is required').not().isEmpty(),
    ],
  ],

  async (req, res, next) => {
    const errors = validationResult(req);
    try {
      // invalite input
      if (!errors.isEmpty()) {
        let err = {
          statusCode: 400,
          errors: errors.array(),
        };
        throw err;
      }

      let { action, symbol, quantity, price } = req.body;

      // check current price
      const data = await fetchPricePromise(symbol);
      // buying case
      if (action === 'BUY') {
        if (price < data.c) {
          let err = {
            statusCode: 400,
            errors: [
              {
                msg: `Buy failed: Your price is lower than ${symbol} current price.`,
              },
            ],
          };
          throw err;
        }
        if (price >= data.c) price = data.c;
      }

      // selling case
      if (action === 'SELL') {
        if (price <= data.c) price = data.c;
        quantity = 0 - quantity;

        if (price > data.c) {
          let err = {
            statusCode: 400,
            errors: [
              {
                msg: `Sell failed: Your price is higher than ${symbol} current price.`,
              },
            ],
          };
          throw err;
        }
      }

      const cost = Number(price) * quantity;
      const newTransaction = {
        symbol: symbol,
        quantity: Number(quantity),
        cost: cost,
      };

      let user = req.user;

      // check current balance if enough for buying
      let newBalance = user.balance - cost;
      if (newBalance < 0) {
        let err = {
          statusCode: 400,
          errors: [{ msg: 'Not enough cash.' }],
        };
        throw err;
      }

      let hasOne = false;

      for (let i = 0; i < user.shareholding.length; i++) {
        if (user.shareholding[i].symbol === newTransaction.symbol) {
          user.shareholding[i].quantity += newTransaction.quantity;
          // check current quantity if enough for selling
          if (user.shareholding[i].quantity < 0) {
            let err = {
              statusCode: 400,
              errors: [{ msg: `Not enough quantity to sell ${symbol}.` }],
            };
            throw err;
          }
          user.shareholding[i].cost += newTransaction.cost;
          hasOne = true;
          break;
        }
      }

      if (!hasOne) {
        // Did not have the stock before, buying
        if (action === 'BUY') user.shareholding.push(newTransaction);
        // Did not have the stock before, selling
        else if (action === 'SELL') {
          let err = {
            statusCode: 400,
            errors: [{ msg: `You don't have ${symbol}.` }],
          };
          throw err;
        }
      }

      // only change the shareholding & balance fields in this operation.
      user.shareholding = user.shareholding.filter((el) => {
        return el.quantity !== 0;
      });
      user.balance = newBalance;

      // add a new transaction
      let transaction = new Transaction({
        user: req.user.id,
        action: action,
        symbol: symbol,
        quantity: Math.abs(quantity),
        price: price,
        cost: 0 - cost,
      });

      // save transaction before save user
      await transaction.save();
      await user.save();

      res.json(user);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// @route  GET api/transactions
// @desc   Get all posts
// @access Private
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(transactions);
  } catch (error) {
    console.error(error);
    let err = {
      statusCode: 500,
      errors: [{ msg: 'Fetching transaction list failed.' }],
    };
    next(err);
  }
});

module.exports = router;
