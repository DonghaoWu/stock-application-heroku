import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { setAlert } from '../../actions/alert.action';
import { buyStock } from '../../actions/transaction.action';

import CheckPrice from './CheckPrice';

const BuyStock = ({ user, setAlert, buyStock }) => {
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

    if (user.balance < quantity * price) {
      setAlert({
        msg: 'Not enough cash!',
        alertType: 'danger',
      });
      return;
    }
    buyStock({
      action: 'BUY',
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
          value="BUY"
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
  buyStock: (stockInfo) => dispatch(buyStock(stockInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyStock);
