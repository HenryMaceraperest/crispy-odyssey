import { HISTORY_ACTION_TYPES } from "./history.types";

const INITIAL_STATE = {
    isHistoryOpen: false,
    isMenuOpen: false,
    historyItems: [],
    historyCount: 0
};

export const historyReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case HISTORY_ACTION_TYPES.SET_HISTORY_ITEMS:
            return {
                ...state,
                historyItems: action.payload
            }
        case HISTORY_ACTION_TYPES.SET_IS_HISTORY_OPEN:
            return {
                ...state,
                isHistoryOpen: action.payload,
            }
        case HISTORY_ACTION_TYPES.SET_IS_MENU_OPEN:
            return {
                ...state,
                isMenuOpen: action.payload,
            }
        default:
            return state;
    }
};