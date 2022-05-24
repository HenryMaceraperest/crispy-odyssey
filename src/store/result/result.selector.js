import { createSelector } from "reselect";

const selectSearchResultReducer = (state) => state.searchResult;

export const selectSearchResultIsLoading = createSelector(
    [selectSearchResultReducer],
    (searchResultSlice) => searchResultSlice.isLoading
);

export const selectSearchResult = createSelector(
    [selectSearchResultReducer],
    (searchResultSlice) => searchResultSlice.searchResult
);

export const selectSearchResultFromQuery = createSelector(
    [selectSearchResultReducer],
    (searchResultSlice) => searchResultSlice.fromQuery
);

export const selectSearchResultToQuery = createSelector(
    [selectSearchResultReducer],
    (searchResultSlice) => searchResultSlice.toQuery
);

export const selectSearchResultDateQuery = createSelector(
    [selectSearchResultReducer],
    (searchResultSlice) => searchResultSlice.dateQuery
);

export const selectSearchResultConnectingFlight = createSelector(
    [selectSearchResultReducer],
    (searchResultSlice) => searchResultSlice.connectingFlight
);