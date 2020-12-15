import axios from 'axios';
import { setAlert } from './alert.action';
import {
    CHECK_PRICE_SUCCESS,
    CHECK_PRICE_FAILURE,
} from './types';

export const checkPrice = (symbol) => async dispatch => {
    try {
        document.getElementById("check-price-button").innerHTML = `Loading......`;

        if (!symbol) {
            document.getElementById("check-price-button").innerHTML = `Check price`;
            dispatch(setAlert({
                msg: `Please input a query symbol.`,
                alertType: 'danger'
            }));
            return;
        }

        document.getElementById("checking-spinner").removeAttribute('hidden');
        const res = await axios.get(`/api/stock/${symbol}`);
        const stockData = res.data.stockData;

        if (stockData['c'] !== 0) {
            document.getElementById("checking-spinner").setAttribute('hidden', '');
            dispatch(setAlert({ msg: 'Check price sucess', alertType: 'success' }))
            dispatch({
                type: CHECK_PRICE_SUCCESS,
                payload: res.data
            })
        }
        else if (stockData['c'] === 0) {
            dispatch(setAlert({ msg: 'Invalid input symbol.', alertType: 'danger' }));
        }
        else {
            dispatch(setAlert({ msg: 'Check price failure', alertType: 'danger' }));
        }
        document.getElementById("checking-spinner").setAttribute('hidden', '');
        document.getElementById("check-price-button").innerHTML = `Check price`;
        return;

    } catch (error) {
        dispatch({
            type: CHECK_PRICE_FAILURE,
        })
        console.error(error);
        document.getElementById("check-price-button").innerHTML = `Check price`;
    }
}