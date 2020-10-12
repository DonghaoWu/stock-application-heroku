import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { buyStock } from '../../actions/transaction';
import { setAlert } from '../../actions/alert';

import store from '../../store';
import { checkPrice } from '../../actions/stockData';

const Buy1 = props => {
    const { auth, singleData } = props;
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
        <div className='operation_container'>
            <form id='buyForm' action="buy-stocks" onSubmit={e => handleSubmit(e)}>
                <div className="operate-form-group">
                    <input
                        type="text"
                        placeholder="Ticker"
                        name="name"
                        value={name}
                        onChange={e => handleChange(e)}
                        required
                    />
                </div>
                <div className="operate-form-group">
                    <input
                        type="text"
                        placeholder="Quantity"
                        value={quantity}
                        name="quantity"
                        onChange={e => handleChange(e)}
                        required
                    />
                </div>
                <div className="operate-form-group">
                    <input
                        type="text"
                        placeholder="Price"
                        name="price"
                        value={price}
                        onChange={e => handleChange(e)}
                        required
                    />
                </div>
                <input type="submit" className="btn btn-danger operate-btn" value="Place" />
            </form>

            <div id='check_price_container'>
                <div id='check_price_button_spinner'>
                    <button id='check_price_button' onClick={() => store.dispatch(checkPrice(formData.name))}>Check price</button>
                    <div id="checking_spinner" hidden></div>
                </div>
            </div>

            <table className='operate_table' id='query_table'>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Current price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        <tr>
                            <td >{singleData['01. symbol']}</td>
                            <td >{singleData['05. price']}</td>
                        </tr>
                    }
                </tbody>
            </table>
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

