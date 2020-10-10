import axios from 'axios';
import { LOAD_TRANSACTION_SUCCESS, LOAD_TRANSACTION_FAILURE, BUY_STOCK_SUCCESS } from './types';
import { loadUser } from './auth';
import { setAlert } from './alert';

export const loadTransaction = () => async dispatch => {
    try {
        const res = await axios.get('/api/transactions');

        dispatch({
            type: LOAD_TRANSACTION_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.error(error)
        dispatch({
            type: LOAD_TRANSACTION_FAILURE,
        })
        dispatch(setAlert({
            msg: 'Load transaction failure',
            alertType: 'danger'
        }))
    }
}

export const buyStock = ({ action, name, quantity, price }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const body = JSON.stringify({
        action: action,
        name: name,
        quantity: quantity,
        price: price,
    })
    try {
        const res = await axios.post('/api/transactions', body, config);

        dispatch({
            type: BUY_STOCK_SUCCESS,
            payload: res.data,
        })
        dispatch(loadUser());
    } catch (error) {
        console.error(error);
    }
}