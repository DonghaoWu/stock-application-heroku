import {
    LOAD_TRANSACTION_SUCCESS,
    CLEAR_TRANSACTIONS,
    CLEAR_ALL_PREVIOUS_USER_DATA
} from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOAD_TRANSACTION_SUCCESS:
            return [...payload];
        case CLEAR_TRANSACTIONS:
        case CLEAR_ALL_PREVIOUS_USER_DATA:
            return [];
        default:
            return state;
    }
}