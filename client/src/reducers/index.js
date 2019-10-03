import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';

//alert is a function, it will return a state.
//components can access state from here.
export default combineReducers({
    alert: alert,
    auth: auth,
});

