import axios from 'axios';

import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import { loadTransaction } from './transaction';
import { loadStockData } from './stockData';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    NO_TOKEN,
    CLEAR_ALL_PREVIOUS_USER_DATA
} from './types';

//Load user
export const loadUser = () => async dispatch => {
    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });

        dispatch(setAlert({
            msg: 'Load user success',
            alertType: 'success'
        }));

    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
        dispatch(setAlert({
            msg: 'Load user failure',
            alertType: 'danger'
        }))
    }
}

//Load all data
export const loadAllData = () => async dispatch => {
    if (!localStorage.token) {
        dispatch({
            type: NO_TOKEN
        });
        return;
    }

    else {
        setAuthToken(localStorage.token);
        try {
            dispatch(loadUser());
            dispatch(loadStockData());
            dispatch(loadTransaction());
        } catch (error) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }
}

//Register user
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const body = JSON.stringify({
        name: name,
        email: email,
        password: password,
    })

    try {
        const tokenData = await axios.post('/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: tokenData.data,
        })

        setAuthToken(tokenData.data.token);

        dispatch(loadUser());
        dispatch(setAlert({
            msg: 'Sign up success',
            alertType: 'success'
        }));

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(
                setAlert({
                    msg: error.msg,
                    alertType: 'danger'
                })
            ))
        }
        dispatch({
            type: REGISTER_FAIL,
        })
    }
}

//Login user
export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const body = JSON.stringify({
        email: email,
        password: password,
    })

    try {
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });

        setAuthToken(res.data.token);

        dispatch(loadUser());
        dispatch(loadStockData());
        dispatch(loadTransaction());

        dispatch(setAlert({
            msg: 'Sign in success',
            alertType: 'success'
        }));

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(
                setAlert({
                    msg: error.msg,
                    alertType: 'danger'
                })
            ))
        }
        dispatch({
            type: LOGIN_FAIL,
        })
    }
}

//Logout /clear profile
export const logout = () => dispatch => {
    dispatch({
        type: CLEAR_ALL_PREVIOUS_USER_DATA
    })
    dispatch(setAlert({
        msg: 'Sign out success',
        alertType: 'success'
    }))
}

export const loadDataAfterOperation = () => async dispatch => {
    try {
        dispatch(loadUser());
        dispatch(loadStockData());
        dispatch(loadTransaction());
    } catch (error) {
        console.error(error);
    }
}

