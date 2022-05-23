import { createSelector } from "reselect";

const selectValidityReducer = (state) => state.validity;

export const selectValidity = createSelector(
    [selectValidityReducer],
    (validitySlice) => validitySlice.validity
);