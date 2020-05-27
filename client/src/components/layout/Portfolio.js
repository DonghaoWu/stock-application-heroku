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

    const setColor = (priceOne, priceTwo) => {
        if (priceOne > priceTwo) return 'green';
        else if (priceOne < priceTwo) return 'red';
        else return 'grey';
    }

    return (
        <div>
            {
                (auth.user) ?
                    <div className='portfolio_container'>
                        <div className='holding_stocks'>
                            <p className='tran_header'>PORTFOLIO</p>
                            <p className='tran_header'>Total($ {auth.user.stock + auth.user.balance})</p>
                            <p className='tran_header'>Stock value($ {auth.user.stock})</p>
                            <table className='tran_table'>
                                <thead>
                                    <tr>
                                        <th>Symbol</th>
                                        <th>Own Quantity</th>
                                        <th>Current price</th>
                                        <th>Previous Close</th>
                                        <th>Change</th>
                                        <th>Change Percent</th>
                                        <th>Open price</th>
                                        <th>High</th>
                                        <th>Low</th>
                                        <th>Current Value</th>
                                        <th>Current Available share</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        auth.user.shareholding.map((el, index) => {
                                            if (el.apiData) {
                                                // temp = temp + Math.floor(el.apiData['05. price'] * el.quantity);
                                                return (
                                                    <tr key={index}>
                                                        <td>{el.name}</td>
                                                        <td>{el.quantity} shares</td>
                                                        <td className={setColor(el.apiData['05. price'], el.apiData['08. previous close'])} > {el.apiData['05. price']}</td>
                                                        <td className={'grey'} > {el.apiData['08. previous close']}</td>
                                                        <td className={el.apiData['09. change'] > 0 ? `green` : `red`} > {el.apiData['09. change']}</td>
                                                        <td className={el.apiData['09. change'] > 0 ? `green` : `red`} > {el.apiData['10. change percent']}</td>
                                                        <td className={setColor(el.apiData['02. open'], el.apiData['08. previous close'])} > {el.apiData['02. open']}</td>
                                                        <td className={setColor(el.apiData['03. high'], el.apiData['08. previous close'])}> {el.apiData['03. high']}</td>
                                                        <td className={setColor(el.apiData['04. low'], el.apiData['08. previous close'])}> {el.apiData['04. low']}</td>
                                                        <td>{el.apiData ? Math.floor(el.apiData['05. price'] * el.quantity) : null}</td>
                                                        <td>{el.apiData ? Math.floor(el.apiData['06. volume'] / 10000) : null}</td>
                                                    </tr>
                                                )
                                            }
                                            else return null
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

