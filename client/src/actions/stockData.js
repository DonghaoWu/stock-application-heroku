import axios from 'axios';
import { LOAD_STOCK_SUCCESS, LOAD_STOCK_FAILURE, GET_SINGLE_STOCK_SUCCESS, GET_SINGLE_STOCK_FAIL } from './types';
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

    let refreshSpinner = document.createElement("div");
    refreshSpinner.setAttribute("id", "refreshing_spinner");

    let refreshAgainText = document.createElement("span");
    refreshAgainText.innerHTML = "Please try later!";
    refreshAgainText.setAttribute("id", "refresh_again_text");

    try {
        let res = {};
        document.getElementById("refresh_button").innerHTML = `Loading...`;

        if (document.getElementById("refresh_again_text")) {
            document.getElementById("refresh_again_text").replaceWith(refreshSpinner);
            res = await axios.get('/api/stock');
            document.getElementById("refreshing_spinner").setAttribute('hidden', '');
        }
        else if (document.getElementById("refreshing_spinner")) {
            document.getElementById("refreshing_spinner").removeAttribute('hidden');
            res = await axios.get('/api/stock');
            document.getElementById("refreshing_spinner").setAttribute('hidden', '');
        }
        document.getElementById("refresh_button").innerHTML = `Refresh`;

        dispatch({
            type: LOAD_STOCK_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        console.error(error);
        document.getElementById("refreshing_spinner").replaceWith(refreshAgainText);
        document.getElementById("refresh_button").innerHTML = `Refresh`;
        dispatch({
            type: LOAD_STOCK_FAILURE,
        })
    }
}

export const checkPrice = (symbol) => async dispatch => {

    let checkAgainText = document.createElement("span");
    checkAgainText.innerHTML = "Please try later!";
    checkAgainText.setAttribute("id", "check_again_text");

    let checkingSpinner = document.createElement("div");
    checkingSpinner.setAttribute("id", "checking_spinner");

    let emptyWarningText = document.createElement("span");
    emptyWarningText.innerHTML = "Please input query symbol!";
    emptyWarningText.setAttribute("id", "check_again_text");

    try {
        document.getElementById("check_price_button").innerHTML = `Loading......`;

        if (!symbol) {
            if (document.getElementById("checking_spinner")) {
                document.getElementById("check_price_button").innerHTML = `Check price`;
                return document.getElementById("checking_spinner").replaceWith(emptyWarningText);
            }
            else if (document.getElementById("check_again_text")) {
                document.getElementById("check_price_button").innerHTML = `Check price`;
                return document.getElementById("check_again_text").replaceWith(emptyWarningText);
            }
        }

        if (document.getElementById("check_again_text")) {
            document.getElementById("check_again_text").replaceWith(checkingSpinner);
        }

        document.getElementById("checking_spinner").removeAttribute('hidden');
        const res = await axios.get(`/api/stock/${symbol}`);

        if (res.data['01. symbol'] !== undefined) {
            document.getElementById("query_table").removeAttribute('hidden');
            document.getElementById("checking_spinner").setAttribute('hidden', '');
        }
        else {
            document.getElementById("query_table").setAttribute('hidden', '');
            document.getElementById("checking_spinner").replaceWith(checkAgainText);
        }

        document.getElementById("check_price_button").innerHTML = `Check price`;

        dispatch({
            type: GET_SINGLE_STOCK_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        console.error(error);
        document.getElementById("check_price_button").innerHTML = `Check price`;
        dispatch({
            type: GET_SINGLE_STOCK_FAIL,
        })
    }
}
