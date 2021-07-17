import axios from 'axios';
import { LOAD_TRANSACTION_SUCCESS, LOAD_TRANSACTION_FAILURE } from './types';
import { setAlert } from './alert.action';
import { loadDataAfterOperation } from './auth.action';

export const loadTransaction = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/transactions');

    dispatch({
      type: LOAD_TRANSACTION_SUCCESS,
      payload: res.data,
    });
    dispatch(
      setAlert({
        msg: 'Load transactions data success',
        alertType: 'success',
      })
    );
  } catch (error) {
    console.error(error);
    dispatch({
      type: LOAD_TRANSACTION_FAILURE,
    });
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

export const buyStock =
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
          msg: `Buy stock success: ${symbol} ${quantity} share(s)`,
          alertType: 'success',
        })
      );
    } catch (error) {
      console.error(error);
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

export const sellStock =
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
        quantity: 0 - quantity,
        price: price,
      });

      await axios.post('/api/transactions', body, config);

      dispatch(loadDataAfterOperation());
      dispatch(
        setAlert({
          msg: `Sell stock success: ${symbol} ${quantity} share(s)`,
          alertType: 'success',
        })
      );
    } catch (error) {
      console.error(error);
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
