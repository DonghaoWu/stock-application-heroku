import { GET_STOCK_SUCCESS, GET_STOCK_FAIL } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_STOCK_SUCCESS:
            return { ...payload };
        case GET_STOCK_FAIL:
            return {}
        default:
            return state;
    }
}