import axios from 'axios';
import {
    LOAD_STOCK_SUCCESS,
    LOAD_STOCK_FAILURE,
    CHECK_PRICE_SUCCESS,
    REFRESH_SUCCESS,
} from './types';
import { setAlert } from './alert';

export const loadStockData = () => async dispatch => {
    try {
        const res = await axios.get('/api/stock');
        dispatch({
            type: LOAD_STOCK_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.error(error);
        dispatch({
            type: LOAD_STOCK_FAILURE,
        })
        dispatch(setAlert({
            msg: 'Load stock data failure',
            alertType: 'danger'
        }))
    }
}

export const refreshStockData = () => async dispatch => {

    const createDivWhenCheckPrice = ({ tagName, innerHTML, id }) => {
        let tag = document.createElement(tagName);
        tag.innerHTML = innerHTML;
        tag.setAttribute('id', id);

        return tag;
    }

    let refreshAgain = createDivWhenCheckPrice({
        tagName: 'div',
        innerHTML: 'Please try later!',
        id: 'refresh-again-text'
    })

    let refreshingSpinner = createDivWhenCheckPrice({
        tagName: 'div',
        innerHTML: '',
        id: 'refreshing-spinner'
    })

    try {
        document.getElementById("refreshing-button").innerHTML = `Loading...`;

        if (document.getElementById("refresh-again-text")) {
            document.getElementById("refresh-again-text").replaceWith(refreshingSpinner);
        }
        document.getElementById("refreshing-spinner").removeAttribute('hidden');
        let res = await axios.get('/api/stock');

        document.getElementById("refreshing-spinner").setAttribute('hidden', '');
        document.getElementById("refreshing-button").innerHTML = `Refresh`;

        if (res.data.stock) {
            document.getElementById("refreshing-spinner").setAttribute('hidden', '');
            dispatch(setAlert({ msg: 'Refresh sucess', alertType: 'success' }))
            dispatch({
                type: REFRESH_SUCCESS,
                payload: res.data
            })
        }
        else {
            dispatch(setAlert({ msg: 'Refresh failure', alertType: 'danger' }));
            document.getElementById("refreshing-spinner").replaceWith(refreshAgain);
        }

    } catch (error) {
        dispatch(setAlert({ msg: 'Refresh failure', alertType: 'danger' }));
        console.error(error);
        document.getElementById("refreshing-spinner").replaceWith(refreshAgain);
        document.getElementById("refreshing-button").innerHTML = `Refresh`;
    }
}

export const checkPrice = (symbol) => async dispatch => {

    const createDivWhenCheckPrice = ({ tagName, innerHTML, id }) => {
        let tag = document.createElement(tagName);
        tag.innerHTML = innerHTML;
        tag.setAttribute('id', id);

        return tag;
    }

    let emptyWarning = createDivWhenCheckPrice({
        tagName: 'div',
        innerHTML: 'Please input query symbol.',
        id: 'empty-symbol-text'
    })

    let tryAgain = createDivWhenCheckPrice({
        tagName: 'div',
        innerHTML: 'Please try later!',
        id: 'try-again-text'
    })

    let checkingSpinner = createDivWhenCheckPrice({
        tagName: 'div',
        innerHTML: '',
        id: 'checking-spinner'
    })

    try {
        document.getElementById("check-price-button").innerHTML = `Loading......`;

        if (!symbol) {
            document.getElementById("check-price-button").innerHTML = `Check price`;
            let target = document.getElementById("checking-spinner") || document.getElementById("try-again-text") || document.getElementById("empty-symbol-text");
            return target.replaceWith(emptyWarning);
        }

        if (document.getElementById("try-again-text") || document.getElementById("empty-symbol-text")) {
            let target = document.getElementById("try-again-text") || document.getElementById("empty-symbol-text");
            target.replaceWith(checkingSpinner);
        }

        document.getElementById("checking-spinner").removeAttribute('hidden');
        const res = await axios.get(`/api/stock/${symbol}`);

        if (res.data['01. symbol']) {
            document.getElementById("checking-spinner").setAttribute('hidden', '');
            dispatch(setAlert({ msg: 'Check price sucess', alertType: 'success' }))
            dispatch({
                type: CHECK_PRICE_SUCCESS,
                payload: res.data
            })
        }
        else {
            dispatch(setAlert({ msg: 'Check price failure', alertType: 'danger' }));
            document.getElementById("checking-spinner").replaceWith(tryAgain);
        }

        document.getElementById("check-price-button").innerHTML = `Check price`;

    } catch (error) {
        console.error(error);
        document.getElementById("check-price-button").innerHTML = `Check price`;
    }
}
