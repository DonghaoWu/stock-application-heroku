import {
  LOAD_STOCK_SUCCESS,
  LOAD_STOCK_FAILURE,
  REFRESH_SUCCESS,
  REFRESH_FAILURE,
  CLEAR_ALL_PREVIOUS_USER_DATA,
} from '../actions/types';

const initialState = {
  data: {},
  updateTime: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_STOCK_SUCCESS:
    case REFRESH_SUCCESS:
      return {
        ...state,
        data: payload,
        updateTime: new Date(),
      };
    case CLEAR_ALL_PREVIOUS_USER_DATA:
      return {
        ...state,
        data: {},
        updateTime: null,
      };
    case LOAD_STOCK_FAILURE:
    case REFRESH_FAILURE:
    default:
      return state;
  }
}
