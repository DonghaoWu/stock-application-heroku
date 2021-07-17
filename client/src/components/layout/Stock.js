import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { refreshStockData } from '../../actions/stock-data.action';

const Stock = ({ user, stockData, refreshStockData }) => {
  let initialTime = new Date();
  const [currentTime, setCurrentTime] = useState(
    initialTime.toLocaleTimeString()
  );

  const setColor = (priceOne, priceTwo) => {
    if (priceOne > priceTwo) return 'green';
    else if (priceOne < priceTwo) return 'red';
    else return 'grey';
  };

  const handleCurrentTime = () => {
    let time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  };

  const handleRefresh = () => {
    refreshStockData();
    handleCurrentTime();
  };

  return (
    <div className="stocks-container">
      <p className="record-header">PORTFOLIO</p>
      <div className="total-container">
        <p className="tran-sub-header">
          Total:{' '}
          {stockData.data
            ? `$ ${Math.floor(stockData.data.currentValue + user.balance)}`
            : `null`}{' '}
        </p>
        <p className="tran-sub-header">
          Stock value:{' '}
          {stockData.data
            ? `$ ${Math.floor(stockData.data.currentValue)}`
            : `null`}
        </p>
        <Link to="#" id="refreshing-button" onClick={handleRefresh}>
          Refresh
        </Link>
        <div hidden id="refreshing-spinner"></div>
      </div>
      <p className="tran-sub-header update-time">Current time: {currentTime}</p>
      <p className="tran-sub-header update-time">
        Updated at:{' '}
        {stockData.updateTime
          ? stockData.updateTime.toLocaleTimeString()
          : `Not available yet`}
      </p>

      <table className="record-table">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Own Shares</th>
            <th>Current price</th>
            <th>Previous Close</th>
            <th>Change</th>
            <th>Change %</th>
            <th>Current Value</th>
            <th>Total cost</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {stockData.data && Object.keys(stockData.data).length ? (
            stockData.data.stock.map((el, index) => {
              return (
                <tr key={index}>
                  <td>{el[0]}</td>
                  <td>{el[1]}</td>
                  <td className={setColor(el[3]['c'], el[3]['pc'])}>
                    {' '}
                    {el[3]['c']}
                  </td>
                  <td className={'grey'}> {el[3]['pc']}</td>
                  <td className={el[3]['c'] - el[3]['o'] > 0 ? `green` : `red`}>
                    {' '}
                    {(el[3]['c'] - el[3]['pc']).toFixed(2)}
                  </td>
                  <td className={el[3]['c'] - el[3]['o'] > 0 ? `green` : `red`}>
                    {' '}
                    {(((el[3]['c'] - el[3]['pc']) / el[3]['pc']) * 300).toFixed(
                      2
                    )}
                  </td>
                  <td>{Math.floor(el[1] * el[3]['c'])}</td>
                  <td>{Math.floor(el[2])}</td>
                  <td
                    className={
                      Math.floor(el[1] * el[3]['c'] - el[2]) > 0
                        ? `green`
                        : `red`
                    }
                  >
                    {Math.floor(el[1] * el[3]['c'] - el[2])}
                  </td>
                </tr>
              );
            })
          ) : (
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
            </tr>
          )}
        </tbody>
      </table>
      <p className="tran-sub-header">CASH ($ {Math.floor(user.balance)} )</p>
    </div>
  );
};

Stock.propTypes = {
  user: PropTypes.object.isRequired,
  stockData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  stockData: state.stockData,
});

const mapDispatchToProps = (dispatch) => ({
  refreshStockData: () => dispatch(refreshStockData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
