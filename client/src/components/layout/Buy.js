import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { checkPrice } from '../../actions/stock-data.action';
import { buyStock } from '../../actions/transaction.action';
import { setAlert } from '../../actions/alert.action';

const Buy = ({ auth, checkPrice, setAlert, buyStock, checkPriceResult }) => {
    const [formData, setFormData] = useState({
        symbol: '',
        quantity: '',
    });

    const { symbol, quantity } = formData;
    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const stockData = await axios.get(`/api/stock/${symbol}`);
        const price = stockData.data.c;

        if (auth.user.balance < quantity * price) {
            setAlert({
                msg: 'Not enough cash!',
                alertType: 'danger'
            });
            return;
        }
        buyStock({ action: 'BUY', symbol: symbol, quantity: quantity, price: price });
    }

    return (
        <div className='operations-content'>
            <form className='oper-form-container' onSubmit={e => handleSubmit(e)}>
                <div className="oper-form">
                    <input
                        type="text"
                        placeholder="Ticker"
                        name="symbol"
                        value={symbol}
                        onChange={e => handleChange(e)}
                        required
                    />
                </div>
                <div className="oper-form">
                    <input
                        type="text"
                        placeholder="Quantity"
                        value={quantity}
                        name="quantity"
                        onChange={e => handleChange(e)}
                        required
                    />
                </div>
                <input type="submit" className="operate-nav-tag place-btn" value="BUY" />
            </form>
            <div className='check-price-container'>
                <div className='button-spinner-container'>
                    <div id='check-price-button' className='operation-nav-tag check-tag' onClick={() => checkPrice(symbol)}>Check price</div>
                    <div id="checking-spinner" hidden></div>
                </div>
                {
                    checkPriceResult.data['c']
                        ?
                        <div className='price-data-container'>
                            <div>Symbol: {symbol}</div>
                            <div>CurrentPrice: {checkPriceResult.data['c']}</div>
                            <div>Updated at: {checkPriceResult.updateTime.toLocaleTimeString()}</div>
                        </div>
                        :
                        null
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    checkPriceResult: state.price
})

const mapDispatchToProps = dispatch => ({
    checkPrice: (symbol) => dispatch(checkPrice(symbol)),
    setAlert: (info) => dispatch(setAlert(info)),
    buyStock: (stockInfo) => dispatch(buyStock(stockInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Buy)