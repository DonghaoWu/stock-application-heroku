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
    LOGOUT,
    CLEAR_TRANSACTIONS,
    NO_TOKEN
} from './types';

//Load user
export const loadUser = () => async dispatch => {
    if (!localStorage.token) {
        dispatch({
            type: NO_TOKEN
        });
        return;
    }

    else {
        setAuthToken(localStorage.token);
        try {
            const res = await axios.get('/api/auth');

            dispatch({
                type: USER_LOADED,
                payload: res.data,
            })

            dispatch(setAlert({
                msg: 'Sign in success',
                alertType: 'success'
            }))

            dispatch(loadStockData());
            dispatch(loadTransaction());
        } catch (error) {
            dispatch({
                type: AUTH_ERROR
            })
            dispatch(setAlert({
                msg: 'Sign in failure',
                alertType: 'danger'
            }))
        }
    }
}

export const loadUserAfterSignUp = () => async dispatch => {
    if (!localStorage.token) {
        dispatch({
            type: NO_TOKEN
        });
        return;
    }

    setAuthToken(localStorage.token);
    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data,
        })

        dispatch(setAlert({
            msg: 'Sign up success',
            alertType: 'success'
        }))

    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
        dispatch(setAlert({
            msg: 'Sign in failure',
            alertType: 'danger'
        }))
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
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        })
        dispatch(loadUserAfterSignUp());
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
        })
        dispatch(loadUser());
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
        type: LOGOUT,
    })
    dispatch({
        type: CLEAR_TRANSACTIONS
    })
    dispatch(setAlert({
        msg: 'Sign out success',
        alertType: 'success'
    }))
}

