import {
  CHECK_PRICE_SUCCESS,
  CHECK_PRICE_FAILURE,
  CLEAR_ALL_USER_DATA,
} from '../actions/types';

const initialState = {
  data: {},
  symbol: '',
  updateTime: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CHECK_PRICE_SUCCESS:
      return {
        ...state,
        data: payload.stockData,
        symbol: payload.symbol,
        updateTime: new Date(),
      };
    case CLEAR_ALL_USER_DATA:
      return {
        ...state,
        data: {},
        symbol: '',
        updateTime: null,
      };
    case CHECK_PRICE_FAILURE:
    default:
      return state;
  }
}
