import React, { createContext, useState, useEffect } from "react";

const addHistoryItem = (historyItems, flightToAdd) => {
    const existingHistoryItem = historyItems.find((historyItem) => historyItem.id === flightToAdd.id);
    if (existingHistoryItem) {
        return historyItems.map((historyItem) => historyItem.id === flightToAdd.id ? { ...historyItem, quantity: historyItem.quantity } : historyItem);
    }
    return [...historyItems, { ...flightToAdd, quantity: 1 }]
}

export const HistoryItemsContext = createContext({
    isHistoryOpen: false,
    setIsHistoryOpen: () => { },
    historyItems: [],
    addFlight: () => { },
    historyCount: 0
});

export const HistoryItemsProvider = ({ children }) => {
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    const [historyItems, setHistoryItems] = useState([]);

    const [historyCount, setHistoryCount] = useState(0);

    useEffect(() => {
        const historyItemsCount = historyItems.reduce((total, historyItem) => total + historyItem.quantity, 0)
        setHistoryCount(historyItemsCount)
    }, [historyItems])


    const addFlight = (flightToAdd) => {
        setHistoryItems(addHistoryItem(historyItems, flightToAdd));
    };

    const value = { isHistoryOpen, setIsHistoryOpen, addFlight, historyItems, historyCount };

    return (
        <HistoryItemsContext.Provider value={value}>{children}</HistoryItemsContext.Provider>
    );
};