import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Stock = props => {

    const { auth } = props;

    const setColor = (priceOne, priceTwo) => {
        if (priceOne > priceTwo) return 'green';
        else if (priceOne < priceTwo) return 'red';
        else return 'grey';
    }

    return (
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
            <p className='tran_header'>CASH($ {auth.user.balance})</p>
        </div>
    )
}

Stock.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Stock)
