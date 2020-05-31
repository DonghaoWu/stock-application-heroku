import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import store from '../../store';
import { refreshStockData } from '../../actions/stockData';

const Stock = props => {

    const { auth, stockData } = props;
    const setColor = (priceOne, priceTwo) => {
        if (priceOne > priceTwo) return 'green';
        else if (priceOne < priceTwo) return 'red';
        else return 'grey';
    }

    return (
        <div className='holding_stocks'>
            <p className='tran_header'>PORTFOLIO</p>
            <div className='total_container'>
                <p className='tran_header'>Total ($ {Math.floor(stockData.value + auth.user.balance)} )</p>
                <Link to='#' id='refresh_button' onClick={() => store.dispatch(refreshStockData())}>Refresh</Link>
                <div hidden id="refreshing_spinner"></div>
            </div>
            <p className='tran_header'>Stock value ($ {Math.floor(stockData.value)} )</p>
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
                        (Object.keys(stockData).length) ?
                            (
                                stockData.stock.map((el, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{el[1]['01. symbol']}</td>
                                            <td>{el[0]} shares</td>
                                            <td className={setColor(el[1]['05. price'], el[1]['08. previous close'])} > {el[1]['05. price']}</td>
                                            <td className={'grey'} > {el[1]['08. previous close']}</td>
                                            <td className={el[1]['09. change'] > 0 ? `green` : `red`} > {el[1]['09. change']}</td>
                                            <td className={el[1]['09. change'] > 0 ? `green` : `red`} > {el[1]['10. change percent']}</td>
                                            <td className={setColor(el[1]['02. open'], el[1]['08. previous close'])} > {el[1]['02. open']}</td>
                                            <td className={setColor(el[1]['03. high'], el[1]['08. previous close'])}> {el[1]['03. high']}</td>
                                            <td className={setColor(el[1]['04. low'], el[1]['08. previous close'])}> {el[1]['04. low']}</td>
                                            <td>{Math.floor(el[0] * el[1]['05. price'])}</td>
                                            <td>{el[1] ? Math.floor(el[1]['06. volume'] / 10000) : null}</td>
                                        </tr>
                                    )
                                })
                            )
                            :
                            <tr>
                                <td>Null</td>
                                <td>Null</td>
                                <td>Null</td>
                                <td>Null</td>
                                <td>Null</td>
                                <td>Null</td>
                                <td>Null</td>
                                <td>Null</td>
                                <td>Null</td>
                                <td>Null</td>
                                <td>Null</td>
                            </tr>
                    }
                </tbody>
            </table>
            <p className='tran_header'>CASH ($ {auth.user.balance} )</p>
        </div>
    )
}

Stock.propTypes = {
    auth: PropTypes.object.isRequired,
    stockData: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    stockData: state.stockData
})

export default connect(mapStateToProps)(Stock)
