import { createSelector } from "reselect";

const selectBookingsReducer = (state) => state.bookingData;


export const selectBookings = createSelector(
    [selectBookingsReducer],
    (bookingDataSlice) => bookingDataSlice.bookingData
);

export const selectBookingID = createSelector(
    [selectBookingsReducer],
    (bookingDataSlice) => bookingDataSlice.bookingData.bookingID
);