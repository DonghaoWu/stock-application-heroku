import axios from 'axios';
import { LOAD_TRANSACTION_SUCCESS, LOAD_TRANSACTION_FAILURE } from './types';
import { setAlert } from './alert';
import { loadUserAfterOperations } from './auth';

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

export const buyStock = ({ action, symbol, quantity, price }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    try {
        const body = JSON.stringify({
            action: action,
            symbol: symbol,
            quantity: quantity,
            price: price,
        });

        await axios.post('/api/transactions', body, config);

        dispatch(loadUserAfterOperations());
        dispatch(setAlert({
            msg: `Buy stock success: ${symbol} ${quantity} share(s)`,
            alertType: 'success'
        }))
    } catch (error) {
        console.error(error);
        dispatch(setAlert({
            msg: `Buy stock failure: ${symbol} ${quantity} share(s)`,
            alertType: 'danger'
        }))
    }
}

export const sellStock = ({ action, symbol, quantity, price }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    try {
        const body = JSON.stringify({
            action: action,
            symbol: symbol,
            quantity: 0 - quantity,
            price: price,
        });

        await axios.post('/api/transactions', body, config);

        dispatch(loadUserAfterOperations());
        dispatch(setAlert({
            msg: `Sell stock success: ${symbol} ${quantity} share(s)`,
            alertType: 'success'
        }))
    } catch (error) {
        console.error(error);
        dispatch(setAlert({
            msg: `Sell stock failure: ${symbol} ${quantity} share(s)`,
            alertType: 'danger'
        }))
    }
}