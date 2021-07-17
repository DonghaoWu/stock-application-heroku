import axios from 'axios';
import {
  LOAD_STOCK_SUCCESS,
  LOAD_STOCK_FAILURE,
  REFRESH_SUCCESS,
  REFRESH_FAILURE,
} from './types';
import { setAlert } from './alert.action';

// load stock data

export const loadStockData = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/stock');
    dispatch({
      type: LOAD_STOCK_SUCCESS,
      payload: res.data,
    });

    dispatch(
      setAlert({
        msg: 'Load stock data success',
        alertType: 'success',
      })
    );
  } catch (error) {
    console.error(error);
    dispatch({
      type: LOAD_STOCK_FAILURE,
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

// refresh data

export const refreshStockData = () => async (dispatch) => {
  const createDivWhenCheckPrice = ({ tagName, innerHTML, id }) => {
    let tag = document.createElement(tagName);
    tag.innerHTML = innerHTML;
    tag.setAttribute('id', id);

    return tag;
  };

  let refreshAgain = createDivWhenCheckPrice({
    tagName: 'div',
    innerHTML: 'Please try later.',
    id: 'refresh-again-text',
  });

  let refreshingSpinner = createDivWhenCheckPrice({
    tagName: 'div',
    innerHTML: '',
    id: 'refreshing-spinner',
  });

  try {
    document.getElementById('refreshing-button').innerHTML = `Loading...`;

    if (document.getElementById('refresh-again-text')) {
      document
        .getElementById('refresh-again-text')
        .replaceWith(refreshingSpinner);
    }
    document.getElementById('refreshing-spinner').removeAttribute('hidden');

    let res = await axios.get('/api/stock');

    document.getElementById('refreshing-spinner').setAttribute('hidden', '');
    document.getElementById('refreshing-button').innerHTML = `Refresh`;

    if (res.data.stock) {
      document.getElementById('refreshing-spinner').setAttribute('hidden', '');
      dispatch(setAlert({ msg: 'Refresh sucess', alertType: 'success' }));
      dispatch({
        type: REFRESH_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch(setAlert({ msg: 'Refresh failure', alertType: 'danger' }));
      document.getElementById('refreshing-spinner').replaceWith(refreshAgain);
    }
  } catch (error) {
    dispatch({
      type: REFRESH_FAILURE,
    });
    dispatch(setAlert({ msg: 'Refresh failure', alertType: 'danger' }));
    console.error(error);
    document.getElementById('refreshing-spinner').replaceWith(refreshAgain);
    document.getElementById('refreshing-button').innerHTML = `Refresh`;
  }
};
