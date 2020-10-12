import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { buyStock } from '../../actions/transaction';
import { setAlert } from '../../actions/alert';

import store from '../../store';
import { checkPrice } from '../../actions/stockData';

const Buy1 = props => {
    const { auth } = props;
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
            props.setAlert('Not enough cash!', 'danger');
        }
        props.buyStock(({ action: 'BUY', name: name, quantity: quantity, price: price }));
    }
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
                <input type="submit" className="operate-nav-tag place-btn" value="SELL" />
            </form>

            <div className='check-price-container'>
                <div id='check_price_button_spinner'>
                    <div id='check-price-button' className='operation-nav-tag check-tag' onClick={() => store.dispatch(checkPrice(formData.name))}>Check price</div>
                    <div id="checking_spinner" hidden></div>
                </div>
            </div>
        </div>
    )
}


Buy1.propTypes = {
    auth: PropTypes.object.isRequired,
    buyStock: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    singleData: state.singleData
})

export default connect(mapStateToProps, { buyStock, setAlert })(Buy1)