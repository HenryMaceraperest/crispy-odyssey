import { VALIDITY_ACTION_TYPES } from "./validity.types";

const INITIAL_STATE = {
    validity: 'TODAY'
};

export const validityReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case VALIDITY_ACTION_TYPES.SET_VALIDITY:
            return {
                ...state,
                validity: action.payload
            }
        default:
            return state;
    }
};