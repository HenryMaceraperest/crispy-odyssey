import React, { useContext } from 'react';

import { BookingDataContext } from '../../../contexts/book-item.context';

import './book.styles.scss';

const BookingPage = () => {
    const { bookingData } = useContext(BookingDataContext);

    // bookingData contains id, from, to, flightDistance, startDate, endDate, travelTime, price, flightCompany
    const { from, to, id, flightDistance, startDate, endDate, travelTime, price, flightCompany } = bookingData;
    return (
        <div>
            <h1>This is the page to book stuff.</h1>
            <h2>{from}</h2>
            <h2>{to}</h2>
            <h2>{id}</h2>
            <h2>{flightDistance} km</h2>
            <h2>{startDate}</h2>
            <h2>{endDate}</h2>
            <h2>{travelTime}</h2>
            <h2>${price}</h2>
            <h2>{flightCompany}</h2>
        </div>
    )
};

export default BookingPage;