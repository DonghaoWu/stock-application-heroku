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
        let availableShare = 1000000000;
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
        <div>
            {
                (auth.user) ?
                    <div className='portfolio_container'>
                        <div className='holding_stocks'>
                            <p className='tran_header'>PORTFOLIO($ {auth.user.balance})</p>
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
                                                    <td>{el.apiData ? el.apiData['02. open'] : null}</td>
                                                    <td>{el.apiData ? el.apiData['05. price'] : null}</td>
                                                    <td>{el.apiData ? Math.floor(el.apiData['05. price'] * el.quantity) : null}</td>
                                                    <td>{el.apiData ? Math.floor(el.apiData['06. volume'] / 1000) : null}</td>
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
                                <input type="submit" className="btn btn-primary" value="Buy" />
                            </form>
                        </div>
                    </div>
                    :
                    <p>Loading...</p>
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

