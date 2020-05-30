import axios from 'axios';
import { GET_STOCK_SUCCESS, GET_STOCK_FAIL } from './types';

export const loadStockData = () => async dispatch => {
    try {
        const res = await axios.get('/api/stock');
        dispatch({
            type: GET_STOCK_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_STOCK_FAIL,
        })
    }
}

export const refreshStockData = () => async dispatch => {
    try {
        let res = {};
        if (document.getElementById("mySpan")) {
            let mySpinner = document.createElement("div");
            mySpinner.setAttribute("id", "spinner");
            document.getElementById("mySpan").replaceWith(mySpinner);
            res = await axios.get('/api/stock');
            document.getElementById("spinner").setAttribute('hidden', '');
        }
        else if (document.getElementById("spinner")) {
            document.getElementById("spinner").removeAttribute('hidden');
            res = await axios.get('/api/stock');
            document.getElementById("spinner").setAttribute('hidden', '');
        }
        dispatch({
            type: GET_STOCK_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.error(error);
        let mySpan = document.createElement("span");
        mySpan.innerHTML = "Please try later!";
        mySpan.setAttribute("id", "mySpan");
        document.getElementById("spinner").replaceWith(mySpan);
        dispatch({
            type: GET_STOCK_FAIL,
        })
    }
}
