const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Transaction = require('../../models/Transaction');
const User = require('../../models/User');
const axios = require('axios');

const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.FIN_HUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi()

// @route  GET api/stock
// @desc   Get all stock data
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const allStocksData = {
            value: 0,
            stock: [],
        };

        const handleOneRequest = (index) => {
            return new Promise(resolve => {
                finnhubClient.quote(user.shareholding[index].symbol, (error, data, response) => {
                    resolve(data);
                })
            })
        }

        const handleAllRequest = async (index) => {
            const res = await handleOneRequest(index);
            allStocksData.stock.push([user.shareholding[index].quantity, res, user.shareholding[index].symbol]);
            allStocksData.value += Number(res.c * user.shareholding[index].quantity);
            index++;
            if (index < user.shareholding.length) {
                await handleAllRequest(index);
            }
        }

        if (user.shareholding.length > 0) {
            await handleAllRequest(0);
        }
        res.json(allStocksData);
        return;
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error occurs in fetching all stock data.');
    }
});


// @route  GET api/stock/:symbol
// @desc   Get single stock data
// @access Private
router.get('/:symbol', async (req, res) => {
    try {
        const symbol = req.params.symbol;
        finnhubClient.quote(symbol, (error, data, response) => {
            return res.json({
                stockData: data,
                symbol: symbol
            });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error.');
    }
});

module.exports = router;