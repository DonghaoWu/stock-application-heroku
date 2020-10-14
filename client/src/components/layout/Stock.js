import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { refreshStockData } from '../../actions/stockData';

const Stock = props => {

    const { auth, stockData, refreshStockData } = props;
    const setColor = (priceOne, priceTwo) => {
        if (priceOne > priceTwo) return 'green';
        else if (priceOne < priceTwo) return 'red';
        else return 'grey';
    }

    let initialTime = new Date()

    const [currentTime, setCurrentTime] = useState(initialTime.toLocaleTimeString())

    const handleCurrentTime = () => {
        let time = new Date().toLocaleTimeString();
        setCurrentTime(time);
    }
    
    return (
        <div className='stocks-container'>
            <p className='record-header'>PORTFOLIO</p>
            <div className='total-container'>
                <p className='tran-sub-header'>Total: {stockData.data ? (`$ ${Math.floor(stockData.data.value + auth.user.balance)}`) : `null`} </p>
                <p className='tran-sub-header'>Stock value: {stockData.data ? (`$ ${Math.floor(stockData.data.value)}`) : `null`}</p>
                <Link to='#' id='refreshing-button' onClick={() => {
                    refreshStockData();
                    handleCurrentTime();
                }}>Refresh</Link>
                <div hidden id="refreshing-spinner"></div>
            </div>
            <p className='tran-sub-header update-time'>Current time: {currentTime}</p>
            <p className='tran-sub-header update-time'>Updated at: {stockData.updateTime ? stockData.updateTime.toLocaleTimeString() : `Not available yet`}</p>

            <table className='record-table'>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Own Shares</th>
                        <th>Current price</th>
                        <th>Previous Close</th>
                        <th>Change</th>
                        <th>Change %</th>
                        <th>Open price</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Current Value</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (stockData.data && Object.keys(stockData.data).length) ?
                            (
                                stockData.data.stock.map((el, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{el[1]['01. symbol']}</td>
                                            <td>{el[0]}</td>
                                            <td className={setColor(el[1]['05. price'], el[1]['08. previous close'])} > {el[1]['05. price']}</td>
                                            <td className={'grey'} > {el[1]['08. previous close']}</td>
                                            <td className={el[1]['09. change'] > 0 ? `green` : `red`} > {el[1]['09. change']}</td>
                                            <td className={el[1]['09. change'] > 0 ? `green` : `red`} > {el[1]['10. change percent']}</td>
                                            <td className={setColor(el[1]['02. open'], el[1]['08. previous close'])} > {el[1]['02. open']}</td>
                                            <td className={setColor(el[1]['03. high'], el[1]['08. previous close'])}> {el[1]['03. high']}</td>
                                            <td className={setColor(el[1]['04. low'], el[1]['08. previous close'])}> {el[1]['04. low']}</td>
                                            <td>{Math.floor(el[0] * el[1]['05. price'])}</td>
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
                            </tr>
                    }
                </tbody>
            </table>
            <p className='tran-sub-header'>CASH ($ {Math.floor(auth.user.balance)} )</p>
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

const mapDispatchToProps = dispatch => ({
    refreshStockData: () => dispatch(refreshStockData())
})

export default connect(mapStateToProps, mapDispatchToProps)(Stock)
