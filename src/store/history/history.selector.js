import { createSelector } from "reselect";

const selectHistoryReducer = state => state.history;

export const selectHistoryItems = createSelector(
    [selectHistoryReducer],
    (history) => history.historyItems
);

export const selectIsHistoryOpen = createSelector(
    [selectHistoryReducer],
    (history) => history.isHistoryOpen
);

export const selectIsMenuOpen = createSelector(
    [selectHistoryReducer],
    (history) => history.isMenuOpen
);

export const selectHistoryCount = createSelector(
    [selectHistoryItems],
    (historyItems) => historyItems.reduce((total, historyItem) => total + historyItem.quantity, 0)
);

