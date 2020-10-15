import {
    CHECK_PRICE_SUCCESS,
    CHECK_PRICE_FAILURE,
} from '../actions/types';

const initialState = {
    data: {},
    updateTime: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CHECK_PRICE_SUCCESS:
            return {
                ...state,
                data: payload,
                updateTime: new Date()
            };
        case CHECK_PRICE_FAILURE:
        default:
            return state;
    }
}