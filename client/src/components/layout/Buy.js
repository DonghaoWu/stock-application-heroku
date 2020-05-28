import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { buyStock } from '../../actions/transaction';
import { setAlert } from '../../actions/alert';

const Buy = props => {
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
        let availableShare = 100000000;
        let currentPrice = 0;
        for (let i = 0; i < auth.user.shareholding.length; i++) {
            if (auth.user.shareholding[i].name === name && auth.user.shareholding[i].apiData) {
                availableShare = auth.user.shareholding[i].apiData['06. volume'];
                currentPrice = auth.user.shareholding[i].apiData['05. price']
                break;
            }
        }
        if (quantity > Math.floor(availableShare / 1000)) {
            props.setAlert('Not enough shares!', 'danger');
            return;
        }
        if (Number(price) < currentPrice) {
            props.setAlert('Price is lower than current price!', 'danger');
            return;
        }
        props.buyStock(({ action: 'BUY', name: name, quantity: quantity, price: price }));
    }
    return (
        <div className='buy_stocks'>
            <form className="form" action="buy-stocks" onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                    <label>Ticker</label>
                    <input
                        type="text"
                        placeholder="Ticker"
                        name="name"
                        value={name}
                        onChange={e => handleChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Qty</label>
                    <input
                        type="text"
                        placeholder="Quantity"
                        value={quantity}
                        name="quantity"
                        onChange={e => handleChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="text"
                        placeholder="Price"
                        name="price"
                        value={price}
                        onChange={e => handleChange(e)}
                        required
                    />
                </div>
                <input type="submit" className="btn btn-success" value="Buy" />
            </form>
        </div>
    )
}


Buy.propTypes = {
    auth: PropTypes.object.isRequired,
    buyStock: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { buyStock, setAlert })(Buy)

