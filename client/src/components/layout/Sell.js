import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { checkPrice } from '../../actions/check-price.action';
import { sellStock } from '../../actions/transaction.action';
import { setAlert } from '../../actions/alert.action';

const Buy = ({ auth, checkPrice, setAlert, sellStock, checkPriceResult }) => {
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
        const symbolTrim = symbol.trim();
        const res = await axios.get(`/api/stock/${symbolTrim}`);
        const price = res.data.stockData.c;
        let hasOne = false;

        for (let i = 0; i < auth.user.shareholding.length; i++) {
            if (auth.user.shareholding[i].symbol === symbolTrim) {
                hasOne = true;
                if (quantity > auth.user.shareholding[i].quantity) {
                    setAlert({
                        msg: `Not enough shares:  You have ${symbolTrim} ${auth.user.shareholding[i].quantity} share(s).`,
                        alertType: 'danger'
                    });
                    return;
                }
            }
        }
        if (!hasOne) {
            setAlert({
                msg: `You don't have ${symbolTrim}.`,
                alertType: 'danger'
            });
            return;
        }
        sellStock({ action: 'SELL', symbol: symbolTrim, quantity: quantity, price: price });
        setFormData({ ...formData, symbol: '', quantity: '' })
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
                <input type="submit" className="operate-nav-tag place-btn" value="SELL" />
            </form>
            <div className='check-price-container'>
                <div className='button-spinner-container'>
                    <div id='check-price-button' className='operation-nav-tag check-tag' onClick={() => checkPrice(symbol.trim())}>Check price</div>
                    <div id="checking-spinner" hidden></div>
                </div>
                {
                    checkPriceResult.data['c']
                        ?
                        <div className='price-data-container'>
                            <div>Symbol: {checkPriceResult.symbol}</div>
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
    sellStock: (stockInfo) => dispatch(sellStock(stockInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Buy)