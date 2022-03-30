import React, { createContext, useState } from "react";

const addFooterItem = (footerItems, flightToAdd) => {
    return [...footerItems, { ...flightToAdd }]
}

export const FooterItemsContext = createContext({
    footerItems: [],
    addFlight: () => { }
});

export const FooterItemsProvider = ({ children }) => {
    const [footerItems, setFooterItems] = useState([]);

    const addFlight = (flightToAdd) => {
        setFooterItems(addFooterItem(footerItems, flightToAdd));
    };

    const value = { addFlight, footerItems };

    return (
        <FooterItemsContext.Provider value={value}>{children}</FooterItemsContext.Provider>
    );
};