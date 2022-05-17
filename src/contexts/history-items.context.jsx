import React, { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

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

const HISTORY_ACTION_TYPES = {
    SET_HISTORY_ITEMS: 'SET_HISTORY_ITEMS',
    SET_IS_HISTORY_OPEN: 'SET_IS_HISTORY_OPEN',
    SET_HISTORY_COUNT: 'SET_HISTORY_COUNT'
}

const INITIAL_STATE = {
    isHistoryOpen: false,
    historyItems: [],
    historyCount: 0
};

const historyReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case HISTORY_ACTION_TYPES.SET_HISTORY_ITEMS:
            return {
                ...state,
                ...payload
            }
        case HISTORY_ACTION_TYPES.SET_IS_HISTORY_OPEN:
            return {
                ...state,
                isHistoryOpen: payload,
            }
        default:
            throw new Error(`Unhandled type of ${type} in historyReducer!`)
    }
};

export const HistoryItemsContext = createContext({
    isHistoryOpen: false,
    setIsHistoryOpen: () => { },
    historyItems: [],
    addFlight: () => { },
    removeFlight: () => { },
    historyCount: 0
});

export const HistoryItemsProvider = ({ children }) => {

    const [{ historyItems, isHistoryOpen, historyCount }, dispatch] = useReducer(historyReducer, INITIAL_STATE);

    const updateHistoryReducer = (historyItems) => {

        const historyItemsCount = historyItems.reduce((total, historyItem) => total + historyItem.quantity, 0);

        const payload = {
            historyItems,
            historyCount: historyItemsCount
        }

        dispatch(createAction(HISTORY_ACTION_TYPES.SET_HISTORY_ITEMS, payload));
    }

    const addFlight = (flightToAdd) => {
        const newHistoryItems = addHistoryItem(historyItems, flightToAdd);
        updateHistoryReducer(newHistoryItems);
    };

    const removeFlightFromHistory = (flightToRemove) => {
        const newHistoryItems = removeFlight(historyItems, flightToRemove);
        updateHistoryReducer(newHistoryItems);
    }

    const setIsHistoryOpen = (bool) => {
        dispatch(createAction(HISTORY_ACTION_TYPES.SET_IS_HISTORY_OPEN, bool));
    }

    const value = { isHistoryOpen, removeFlightFromHistory, setIsHistoryOpen, addFlight, historyItems, historyCount };

    return (
        <HistoryItemsContext.Provider value={value}>{children}</HistoryItemsContext.Provider>
    );
};