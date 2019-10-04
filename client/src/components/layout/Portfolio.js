import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { buyStock } from '../../actions/transaction';
import { setAlert } from '../../actions/alert';


const Portfolio = props => {
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
        <div>
            {
                (auth.user) ?
                    <div className='portfolio_container'>
                        <div className='holding_stocks'>
                            <p className='tran_header'>PORTFOLIO($ Current value)</p>
                            <table className='tran_table'>
                                <thead>
                                    <tr>
                                        <th>Symbol</th>
                                        <th>Own Quantity</th>
                                        <th>Open price</th>
                                        <th>Current price</th>
                                        <th>Current Value</th>
                                        <th>current Available share</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        auth.user.shareholding.map((el, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{el.name}</td>
                                                    <td>{el.quantity} shares</td>
                                                    <td>open</td>
                                                    <td>curr</td>
                                                    <td>total</td>
                                                    <td>total</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='buy_stocks'>
                            <p className='tran_header'>CASH($ {auth.user.balance})</p>
                            <form className="form" action="buy-stocks" onSubmit={e => handleSubmit(e)}>
                                <div className="form-group">
                                    <label for="ticker">Ticker</label>
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
                                    <label for="Qty">Qty</label>
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
                                    <label for="price">Price</label>
                                    <input
                                        type="text"
                                        placeholder="Price"
                                        name="price"
                                        value={price}
                                        onChange={e => handleChange(e)}
                                        required
                                    />
                                </div>
                                <input type="submit" className="btn btn-primary" value="Buy" />
                            </form>
                        </div>
                    </div>
                    :
                    <p>Please login or sign up.</p>
            }
        </div>
    )
}

Portfolio.propTypes = {
    auth: PropTypes.object.isRequired,
    buyStock: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { buyStock, setAlert })(Portfolio)

