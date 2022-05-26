import { BOOKING_ACTION_TYPES } from "./booking.types";

const INITIAL_STATE = {
    bookingData: []
};

export const bookingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BOOKING_ACTION_TYPES.ADD_BOOKING_DATA:
            return {
                ...state,
                bookingData: action.payload
            }
        case BOOKING_ACTION_TYPES.SET_BOOKING_ID:
            return {
                ...state,
                bookingData: {
                    ...state.bookingData,
                    bookingID: action.payload
                }
            }
        default:
            return state;
    }
}