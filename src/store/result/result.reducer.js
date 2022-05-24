import { SEARCH_RESULT_ACTION_TYPES } from './result.types';

export const INITIAL_STATE = {
    searchResult: [],
    fromQuery: '',
    toQuery: '',
    dateQuery: '',
    connectingFlight: false,
    isLoading: false,
    error: null,
}

export const searchResultReducer = (state = INITIAL_STATE, action = {}) => {
    const { type, payload } = action;


    switch (type) {
        case SEARCH_RESULT_ACTION_TYPES.SET_SEARCH_RESULT_FROM_QUERY:
            return { ...state, fromQuery: payload }
        case SEARCH_RESULT_ACTION_TYPES.SET_SEARCH_RESULT_TO_QUERY:
            return { ...state, toQuery: payload }
        case SEARCH_RESULT_ACTION_TYPES.SET_SEARCH_RESULT_DATE_QUERY:
            return { ...state, dateQuery: payload }
        case SEARCH_RESULT_ACTION_TYPES.SET_SEARCH_RESULT_CONNECTING_FLIGHT:
            return { ...state, connectingFlight: payload }
        case SEARCH_RESULT_ACTION_TYPES.FETCH_SEARCH_RESULT_START:
            return { ...state, isLoading: true }
        case SEARCH_RESULT_ACTION_TYPES.FETCH_SEARCH_RESULT_SUCCESS:
            return { ...state, searchResult: payload, isLoading: false }
        case SEARCH_RESULT_ACTION_TYPES.FETCH_SEARCH_RESULT_FAILED:
            return { ...state, error: payload, isLoading: false }
        default:
            return state;
    }
}