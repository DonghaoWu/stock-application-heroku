import { combineReducers } from 'redux';
import alert from './alert.reducer';
import auth from './auth.reducer';
import transactions from './transaction.reducer';
import stockData from './stock-data.reducer';
import price from './check-price.reducer';
import admin from './admin.reducer';

//components can access state from here.
export default combineReducers({
  alert: alert,
  auth: auth,
  transactions: transactions,
  stockData: stockData,
  price: price,
  admin: admin,
});
