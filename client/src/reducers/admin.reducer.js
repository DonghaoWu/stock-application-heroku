import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  CLEAR_ALL_USER_DATA,
} from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_USERS_SUCCESS:
      return [...payload];
    case CLEAR_ALL_USER_DATA:
      return [];
    case FETCH_USERS_FAILURE:
    default:
      return state;
  }
}
