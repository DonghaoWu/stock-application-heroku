import axios from 'axios';

import { setAlert } from './alert.action';
import setAuthToken from '../utils/setAuthToken';
import { loadTransaction } from './transaction.action';
import { loadStockData } from './stock-data.action';

import {
    USER_LOADED_SUCCESS,
    USER_LOADED_FAILURE,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    NO_TOKEN,
    CLEAR_ALL_PREVIOUS_USER_DATA
} from './types';

//Load user
export const loadUser = () => async dispatch => {
    try {
        // res is a user data.
        const res = await axios.get('/api/auth');
        const userData = res.data;

        dispatch({
            type: USER_LOADED_SUCCESS,
            payload: userData
        });

        dispatch(setAlert({
            msg: 'Load user success',
            alertType: 'success'
        }));

    } catch (error) {
        dispatch({
            type: USER_LOADED_FAILURE,
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
        const res = await axios.post('/api/users', body, config);
        const userToken = res.data.token;

        dispatch({
            type: REGISTER_SUCCESS,
            payload: userToken
        })

        setAuthToken(userToken);

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
            type: REGISTER_FAILURE,
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
        const userToken = res.data.token;

        dispatch({
            type: LOGIN_SUCCESS,
            payload: userToken,
        });

        setAuthToken(userToken);

        dispatch(loadAllData());

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
            type: LOGIN_FAILURE,
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
        dispatch(loadAllData());
    } catch (error) {
        console.error(error);
    }
}

