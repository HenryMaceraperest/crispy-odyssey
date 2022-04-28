import React, { createContext, useState } from "react";


export const BookingDataContext = createContext({
    bookingData: []
});

export const BookingDataProvider = ({ children }) => {

    const [bookingData, setBookingData] = useState([]);

    const addToBook = (flightBooking) => {
        setBookingData(flightBooking)
    }

    const value = { bookingData, addToBook };

    return (
        <BookingDataContext.Provider value={value}>{children}</BookingDataContext.Provider>
    );
};