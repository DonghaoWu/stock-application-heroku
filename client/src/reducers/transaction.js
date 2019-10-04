import { TRANSACTION_SUCCESS, CLEAR_TRANSACTIONS } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case TRANSACTION_SUCCESS:
            return [...state, ...payload];
        case CLEAR_TRANSACTIONS:
            return []
        default:
            return state;
    }
}