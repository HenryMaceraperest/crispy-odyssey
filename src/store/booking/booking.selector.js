import { createSelector } from "reselect";

const selectBookingsReducer = (state) => state.bookingData;

export const selectBookings = createSelector(
    [selectBookingsReducer],
    (bookingDataSlice) => bookingDataSlice.bookingData
);