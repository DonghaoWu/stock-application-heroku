import axios from 'axios';
import { setAlert } from './alert.action';
import { loadDataAfterOperation } from './auth.action';

export const operation =
  ({ action, symbol, quantity, price }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const body = JSON.stringify({
        action: action,
        symbol: symbol,
        quantity: quantity,
        price: price,
      });

      await axios.post('/api/transactions', body, config);

      dispatch(loadDataAfterOperation());
      dispatch(
        setAlert({
          msg: `${action} stock success: ${symbol} ${quantity} share(s)`,
          alertType: 'success',
        })
      );
    } catch (error) {
      const errors = error.response.data.message;
      if (errors) {
        errors.forEach((error) =>
          dispatch(
            setAlert({
              msg: error.msg,
              alertType: 'danger',
            })
          )
        );
      }
    }
  };

// used in Operation.js
export const handleBuy = async (
  e,
  user,
  setAlert,
  operation,
  symbol,
  quantity
) => {
  e.preventDefault();
  document.getElementById('operation-spinner').removeAttribute('hidden');

  try {
    const symbolTrim = symbol.trim().toUpperCase();
    const res = await axios.get(`/api/stock/${symbolTrim}`);
    const price = res.data.stockData.c;

    if (user.balance < quantity * price) {
      setAlert({
        msg: `Buy ${symbolTrim} failed: No enough cash!`,
        alertType: 'danger',
      });
      document.getElementById('operation-spinner').setAttribute('hidden', '');
      return;
    }
    operation({
      action: 'BUY',
      symbol: symbolTrim,
      quantity: quantity,
      price: price,
    });
  } catch (error) {
    const errors = error.response.data.message;
    if (errors) {
      errors.forEach((error) =>
        setAlert({
          msg: `Buy ${symbol} failed: ${error.msg}`,
          alertType: 'danger',
        })
      );
    }
  }

  document.getElementById('operation-spinner').setAttribute('hidden', '');
};

// used in Operation.js
export const handleSell = async (
  e,
  user,
  setAlert,
  operation,
  symbol,
  quantity
) => {
  e.preventDefault();
  document.getElementById('operation-spinner').removeAttribute('hidden');

  try {
    const symbolTrim = symbol.trim().toUpperCase();
    const res = await axios.get(`/api/stock/${symbolTrim}`);
    const price = res.data.stockData.c;
    let hasOne = false;

    for (let i = 0; i < user.shareholding.length; i++) {
      if (user.shareholding[i].symbol === symbolTrim) {
        hasOne = true;
        if (quantity > user.shareholding[i].quantity) {
          setAlert({
            msg: `Sell ${symbolTrim} failed: No enough quantity!`,
            alertType: 'danger',
          });
          document
            .getElementById('operation-spinner')
            .setAttribute('hidden', '');
          return;
        }
        break;
      }
    }

    if (!hasOne) {
      setAlert({
        msg: `Sell ${symbolTrim} failed: You don't own this stock.`,
        alertType: 'danger',
      });
      document.getElementById('operation-spinner').setAttribute('hidden', '');
      return;
    }
    operation({
      action: 'SELL',
      symbol: symbolTrim,
      quantity: quantity,
      price: price,
    });
  } catch (error) {
    const errors = error.response.data.message;
    if (errors) {
      errors.forEach((error) =>
        setAlert({
          msg: `Sell ${symbol} failed: ${error.msg}`,
          alertType: 'danger',
        })
      );
    }
  }

  document.getElementById('operation-spinner').setAttribute('hidden', '');
};
