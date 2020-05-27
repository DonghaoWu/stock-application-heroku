import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_TRANSACTIONS } from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import { loadTransaction } from './transaction'

//Load user
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        delete axios.defaults.headers.common['x-auth-token'];

        res.data.stock = 0;

        for (let i = 0; i < res.data.shareholding.length; i++) {
            let apiRes = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${res.data.shareholding[i].name}&apikey=5F53S1QWA484BWTH`);
            console.log(apiRes);
            if (apiRes.data){
                res.data.shareholding[i].apiData = apiRes.data['Global Quote'];
                res.data.stock += Number(apiRes.data['Global Quote']['05. price'] * res.data.shareholding[i].quantity);
            } 
        }
        console.log(res.data.stock,'=====>')
        setAuthToken(localStorage.token);
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        })
        dispatch(loadTransaction());
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
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
        dispatch(loadUser());
        //dispatch(loadTransaction());
        //loadUser();
    } catch (error) {
        //---./routes/users.js line 23
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(
                setAlert(error.msg, 'danger')
            ))
        }
        dispatch({
            type: REGISTER_FAIL,
        })
    }
}

//Login user
export const login = (email, password) => async dispatch => {
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
        //---./routes/users.js line 23
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(
                setAlert(error.msg, 'danger')
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
}

