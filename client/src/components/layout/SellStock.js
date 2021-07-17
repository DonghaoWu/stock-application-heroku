import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { setAlert } from '../../actions/alert.action';
import { sellStock } from '../../actions/transaction.action';

import CheckPrice from './CheckPrice';

const SellStock = ({ user, setAlert, sellStock }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const symbolTrim = symbol.trim().toUpperCase();
    const res = await axios.get(`/api/stock/${symbolTrim}`);
    const price = res.data.stockData.c;
    let hasOne = false;

    for (let i = 0; i < user.shareholding.length; i++) {
      if (user.shareholding[i].symbol === symbolTrim) {
        hasOne = true;
        if (quantity > user.shareholding[i].quantity) {
          setAlert({
            msg: `Not enough shares:  You have ${symbolTrim} ${user.shareholding[i].quantity} share(s).`,
            alertType: 'danger',
          });
          return;
        }
      }
    }
    if (!hasOne) {
      setAlert({
        msg: `You don't have ${symbolTrim}.`,
        alertType: 'danger',
      });
      return;
    }
    sellStock({
      action: 'SELL',
      symbol: symbolTrim,
      quantity: quantity,
      price: price,
    });
    setFormData({ ...formData, symbol: '', quantity: '' });
  };

  return (
    <div className="operations-content">
      <form className="oper-form-container" onSubmit={(e) => handleSubmit(e)}>
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
        <input
          type="submit"
          className="operate-nav-tag place-btn"
          value="SELL"
        />
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
  sellStock: (stockInfo) => dispatch(sellStock(stockInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SellStock);
