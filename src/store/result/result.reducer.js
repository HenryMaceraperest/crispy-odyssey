import { SEARCH_RESULT_ACTION_TYPES } from './result.types';

export const INITIAL_STATE = {
    searchResult: []
}

export const searchResultReducer = (state = INITIAL_STATE, action = {}) => {
    const { type, payload } = action;


    switch (type) {
        case SEARCH_RESULT_ACTION_TYPES.SET_SEARCH_RESULT:
            return { ...state, searchResult: payload }
        default:
            return state;
    }
}