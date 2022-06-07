import { createSelector } from "reselect";

const selectSearchResultReducer = (state) => state.searchResult;

export const selectSearchResult = createSelector(
    [selectSearchResultReducer],
    (searchResultSlice) => searchResultSlice.searchResult
);