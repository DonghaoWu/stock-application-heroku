const express = require('express');

const authMiddleware = require('../../middleware/authMiddleware');
const finnhubClient = require('../../config/finhub');

const User = require('../../models/User');

const router = express.Router();

// @route  GET api/stock
// @desc   Get all stock portfolio data
// @access Private
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const user = req.user;
    let allStocksData = {
      stockValue: 0,
      stock: [],
    };

    const handleOneRequest = (stock) => {
      return new Promise((resolve, reject) => {
        finnhubClient.quote(stock.symbol, (error, data, response) => {
          if (error) {
            reject(error);
            return;
          }
          resolve({
            symbol: stock.symbol,
            quantity: stock.quantity,
            spentCost: stock.cost,
            currentPrice: data.c,
            previousClose: data.pc,
            openPrice: data.o,
          });
        });
      });
    };

    if (user.shareholding.length > 0) {
      const requestsPromiseArray = user.shareholding.map((el) => {
        return handleOneRequest(el);
      });

      const resArray = await Promise.all(requestsPromiseArray);
      resArray.forEach((el) => {
        allStocksData.stock.push(el);
        allStocksData.stockValue += Number(el.currentPrice * el.quantity);
      });
    }

    res.json(allStocksData);
  } catch (error) {
    console.log(error);
    if (!error.errors) {
      let defaultError = {
        statusCode: 500,
        errors: [{ msg: 'Fetch user porfolio failed.' }],
      };
      next(defaultError);
    } else next(error);
  }
});

// @route  GET api/stock/:symbol
// @desc   Check price before operations.
// @access Private

const handleCheckPricePromise = (symbol) => {
  return new Promise((resolve, reject) => {
    finnhubClient.quote(symbol, (error, data, response) => {
      if (data.c === 0) {
        reject({
          statusCode: 400,
          errors: [{ msg: 'Invalid Symbol.' }],
        });
      } else
        resolve({
          stockData: data,
          symbol: symbol,
        });
    });
  });
};

router.get('/:symbol', authMiddleware, async (req, res, next) => {
  let symbol = req.params.symbol.trim().toUpperCase();

  try {
    const data = await handleCheckPricePromise(symbol);
    res.json(data);
  } catch (error) {
    if (!error.errors) {
      let defaultError = {
        statusCode: 500,
        errors: [{ msg: `Check ${symbol} price failed.` }],
      };
      next(defaultError);
    } else next(error);
  }
});

module.exports = router;
