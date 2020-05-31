import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import transactions from './transaction';
import stockData from './stockData';
import singleData from './singleStock';

//components can access state from here.
export default combineReducers({
    alert: alert,
    auth: auth,
    transactions: transactions,
    stockData: stockData,
    singleData: singleData,
});

