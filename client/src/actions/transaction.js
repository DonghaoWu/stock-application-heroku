import axios from 'axios';
import { TRANSACTION_SUCCESS } from './types';

export const loadTransaction = () => async dispatch => {
    try {
        const res = await axios.get('/api/transactions');
        dispatch({
            type: TRANSACTION_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.error(error)
    }
}