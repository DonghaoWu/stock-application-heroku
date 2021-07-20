import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { refreshStockData } from '../../../actions/stock-data.action';

const Stock = ({ user, data, updateTime, refreshStockData }) => {
  let initialTime = new Date();
  const [currentTime, setCurrentTime] = useState(
    initialTime.toLocaleTimeString()
  );

  const handleCurrentTime = () => {
    let time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  };

  const handleRefresh = () => {
    refreshStockData();
    handleCurrentTime();
  };

  return (
    <div className="portfolio-sub-contianer">
      <div className="data-summary">
        <p className="data-sub-header">
          Total:{' '}
          {data ? `$ ${Math.floor(data.stockValue + user.balance)}` : `null`}{' '}
        </p>
        <p className="data-sub-header">
          Stock value: {data ? `$ ${Math.floor(data.stockValue)}` : `null`}
        </p>
        <Link to="#" id="refreshing-button" onClick={handleRefresh}>
          Refresh
        </Link>
        <div hidden id="refreshing-spinner"></div>
      </div>
      <p className="data-update-time">Current time: {currentTime}</p>
      <p className="data-update-time">
        Updated at:{' '}
        {updateTime ? updateTime.toLocaleTimeString() : `Not available yet`}
      </p>

      <div className="main-table-container">
        {data && data.stock && data.stock.length ? (
          <table className="main-table">
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
              {data.stock.map(
                (
                  {
                    symbol,
                    quantity,
                    spentCost,
                    currentPrice,
                    previousClose,
                    openPrice,
                  },
                  index
                ) => {
                  const change = (currentPrice - openPrice).toFixed(2);
                  const persent = ((change / previousClose) * 100).toFixed(2);
                  const currentValue = (quantity * currentPrice).toFixed(2);
                  const profit = (quantity * currentPrice - spentCost).toFixed(
                    2
                  );
                  return (
                    <tr key={index}>
                      {/* symbol */}
                      <td>{symbol}</td>
                      {/* quantity */}
                      <td>{quantity}</td>
                      {/* current price */}
                      <td className={change > 0 ? `green` : `red`}>
                        {currentPrice}
                      </td>
                      {/* previous price */}
                      <td className={'grey'}>{previousClose}</td>
                      {/* change */}
                      <td className={change > 0 ? `green` : `red`}>{change}</td>
                      {/* change persent */}
                      <td className={change > 0 ? `green` : `red`}>
                        {persent}
                      </td>
                      {/* current value */}
                      <td>{currentValue}</td>
                      {/* spent cost */}
                      <td>{spentCost.toFixed(2)}</td>
                      {/* profit */}
                      <td className={profit > 0 ? `green` : `red`}>{profit}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
};

Stock.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.stockData.data,
  updateTime: state.stockData.updateTime,
});

const mapDispatchToProps = (dispatch) => ({
  refreshStockData: () => dispatch(refreshStockData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
