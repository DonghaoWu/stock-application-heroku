import React, { useState } from 'react';
import { connect } from 'react-redux';

import { setAlert } from '../../../actions/alert.action';
import { operation } from '../../../actions/trade.action';

import CheckPrice from './CheckPrice';

const TradeAction = ({ user, setAlert, operation, handleSubmit, act }) => {
  const [formData, setFormData] = useState({
    symbol: '',
    quantity: '',
  });

  const { symbol, quantity } = formData;
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="opeation-container">
      <form
        className="oper-form-container"
        onSubmit={(e) =>
          handleSubmit(e, user, setAlert, operation, symbol, quantity)
        }
      >
        <div className="oper-form">
          <input
            type="text"
            placeholder="Ticker"
            name="symbol"
            value={symbol}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="oper-form">
          <input
            type="text"
            placeholder="Quantity"
            value={quantity}
            name="quantity"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="operation-button-spinner">
          <input
            type="submit"
            className="operate-nav-tag place-btn"
            value={act}
          />
          <div hidden id="operation-spinner"></div>
        </div>
      </form>
      <CheckPrice symbol={symbol} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  setAlert: (info) => dispatch(setAlert(info)),
  operation: (stockInfo) => dispatch(operation(stockInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TradeAction);
