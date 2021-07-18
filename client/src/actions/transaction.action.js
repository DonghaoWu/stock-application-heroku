import axios from 'axios';
import { LOAD_TRANSACTION_SUCCESS, LOAD_TRANSACTION_FAILURE } from './types';
import { setAlert } from './alert.action';

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
