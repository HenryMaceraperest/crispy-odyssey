import { BOOKING_ACTION_TYPES } from "./booking.types";

import { createAction } from "../../utils/reducer/reducer.utils";

export const addBooking = (bookingData) => createAction(BOOKING_ACTION_TYPES.ADD_BOOKING_DATA, bookingData);