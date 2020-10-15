import axios from 'axios';
import { setAlert } from './alert.action';
import {
    CHECK_PRICE_SUCCESS,
    CHECK_PRICE_FAILURE,
} from './types';

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
        innerHTML: 'Please try later.',
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
            document.getElementById("checking-spinner").replaceWith(tryAgain);
        }
        else {
            dispatch(setAlert({ msg: 'Check price failure', alertType: 'danger' }));
            document.getElementById("checking-spinner").replaceWith(tryAgain);
        }

        document.getElementById("check-price-button").innerHTML = `Check price`;

    } catch (error) {
        dispatch({
            type: CHECK_PRICE_FAILURE,
        })
        console.error(error);
        document.getElementById("check-price-button").innerHTML = `Check price`;
    }
}