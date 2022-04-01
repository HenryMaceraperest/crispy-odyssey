import React, { createContext, useState } from "react";

const addHistoryItem = (historyItems, flightToAdd) => {
    return [...historyItems, { ...flightToAdd }]
}

export const HistoryItemsContext = createContext({
    isHistoryOpen: false,
    setIsHistoryOpen: () => { },
    historyItems: [],
    addFlight: () => { }
});

export const HistoryItemsProvider = ({ children }) => {
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    const [historyItems, setHistoryItems] = useState([]);

    const addFlight = (flightToAdd) => {
        setHistoryItems(addHistoryItem(historyItems, flightToAdd));
    };

    const value = { isHistoryOpen, setIsHistoryOpen, addFlight, historyItems };

    return (
        <HistoryItemsContext.Provider value={value}>{children}</HistoryItemsContext.Provider>
    );
};