import { GET_SINGLE_STOCK_SUCCESS, GET_SINGLE_STOCK_FAIL } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_SINGLE_STOCK_SUCCESS:
            return { ...payload };
        case GET_SINGLE_STOCK_FAIL:
            return {}
        default:
            return state;
    }
}