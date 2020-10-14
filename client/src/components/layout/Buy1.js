import React, { useState } from 'react';
import { connect } from 'react-redux';

import { checkPrice } from '../../actions/stockData';
import { buyStock } from '../../actions/transaction';
import { setAlert } from '../../actions/alert';

const Buy1 = ({ auth, checkPrice, setAlert, buyStock, checkPriceResult }) => {
    const [formData, setFormData] = useState({
        action: '',
        name: '',
        quantity: '',
        price: '',
    });

    const { name, quantity, price } = formData;
    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (auth.user.balance < quantity * price) {
            setAlert({
                msg: 'Not enough cash!',
                alertType: 'danger'
            });
        }
        buyStock({ action: 'BUY', name: name, quantity: quantity, price: price });
    }

    if (checkPriceResult.updateTime) console.log(checkPriceResult);
    return (
        <div className='operations-content'>
            <form className='oper-form-container' onSubmit={e => handleSubmit(e)}>
                <div className="oper-form">
                    <input
                        type="text"
                        placeholder="Ticker"
                        name="name"
                        value={name}
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
                <div className="oper-form">
                    <input
                        type="text"
                        placeholder="Sell Price"
                        name="price"
                        value={price}
                        onChange={e => handleChange(e)}
                        required
                    />
                </div>
                <input type="submit" className="operate-nav-tag place-btn" value="BUY" />
            </form>
            <div className='check-price-container'>
                <div className='button-spinner-container'>
                    <div id='check-price-button' className='operation-nav-tag check-tag' onClick={() => checkPrice(formData.name)}>Check price</div>
                    <div id="checking-spinner" hidden></div>
                </div>
                {
                    checkPriceResult.data['05. price']
                        ?
                        <div className='price-data-container'>
                            <div>Symbol: {checkPriceResult.data['01. symbol']}</div>
                            <div>CurrentPrice: {checkPriceResult.data['05. price']}</div>
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
    checkPrice: (stockName) => dispatch(checkPrice(stockName)),
    setAlert: (info) => dispatch(setAlert(info)),
    buyStock: (stockInfo) => dispatch(buyStock(stockInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Buy1)