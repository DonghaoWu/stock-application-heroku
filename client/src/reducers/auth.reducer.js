import {
  USER_LOADED_SUCCESS,
  USER_LOADED_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOAD_ALL_DATA_ERROR,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  NO_TOKEN,
  CLEAR_ALL_USER_DATA,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload);
      return {
        ...state,
        token: payload,
      };
    case USER_LOADED_FAILURE:
    case REGISTER_FAILURE:
    case LOAD_ALL_DATA_ERROR:
    case LOGIN_FAILURE:
    case LOGOUT:
    case CLEAR_ALL_USER_DATA:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: {},
      };
    case NO_TOKEN:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
