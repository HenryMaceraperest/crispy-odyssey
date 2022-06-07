import { ROUTES_ACTION_TYPES } from "./route.types";

export const INITIAL_STATE = {
    routes: []
}

export const routesReducer = (state = INITIAL_STATE, action = {}) => {
    const { type, payload } = action;


    switch (type) {
        case ROUTES_ACTION_TYPES.SET_ROUTES:
            return { ...state, routes: payload }
        default:
            return state;
    }
}