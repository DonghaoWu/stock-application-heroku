import { LOAD_STOCK_SUCCESS, LOAD_STOCK_FAILURE } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOAD_STOCK_SUCCESS:
            return { ...payload };
        case LOAD_STOCK_FAILURE:
            return {}
        default:
            return state;
    }
}