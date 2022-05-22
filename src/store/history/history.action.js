import { HISTORY_ACTION_TYPES } from "./history.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setIsHistoryOpen = (boolean) => createAction(HISTORY_ACTION_TYPES.SET_IS_HISTORY_OPEN, boolean);

const addHistoryItem = (historyItems, flightToAdd) => {
    const existingHistoryItem = historyItems.find((historyItem) => historyItem.id === flightToAdd.id);
    if (existingHistoryItem) {
        return historyItems.map((historyItem) => historyItem.id === flightToAdd.id ? { ...historyItem, quantity: historyItem.quantity = 1 } : historyItem);
    }
    return [...historyItems, { ...flightToAdd, quantity: 1 }]
}

const removeFlight = (historyItems, flightToRemove) => {
    return historyItems.filter((historyItem) => historyItem.id !== flightToRemove.id)
};

export const addFlight = (historyItems, flightToAdd) => {
    const newHistoryItems = addHistoryItem(historyItems, flightToAdd);
    return createAction(HISTORY_ACTION_TYPES.SET_HISTORY_ITEMS, newHistoryItems);
};

export const removeFlightFromHistory = (historyItems, flightToRemove) => {
    const newHistoryItems = removeFlight(historyItems, flightToRemove);
    return createAction(HISTORY_ACTION_TYPES.SET_HISTORY_ITEMS, newHistoryItems);
}
