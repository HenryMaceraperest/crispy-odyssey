import React from "react";
import { useSelector } from "react-redux";

import { selectBookings } from "../../../../../store/booking/booking.selector";


const InvalidBookingForm = () => {
    const bookingData = useSelector(selectBookings);
    const { flightFromTos, from, to, flightDistance, startDate, endDate, travelTime, price, flightCompany } = bookingData;

    return (
        <div>
            <div className='flight-data'>
                <label htmlFor="from" className='form-label'>From: </label>
                <p className='form-data'>{from.toUpperCase()}</p>
                <label htmlFor="to" className='form-label'>To: </label>
                <p className='form-data'>{to.toUpperCase()}</p>
                <label htmlFor="flight-distance" className='form-label'>Distance: </label>
                <p className='form-data'>{flightDistance} km</p>
                <label htmlFor="start-date" className='form-label'>Start: </label>
                <p className='form-data'>{startDate}</p>
                <label htmlFor="end-date" className='form-label'>End: </label>
                <p className='form-data'>{endDate}</p>
                <label htmlFor="travel-time" className='form-label'>Total travel time: </label>
                <p className='form-data'>{travelTime}</p>
                <label htmlFor="price" className='form-label'>Price: </label>
                <p className='form-data'>${price}</p>
                <label htmlFor="company-name" className='form-label'>Company name(s): </label>
                <div className='form-data'>{flightCompany.map(x => <p key={x}>{x}</p>)}</div>
                {flightFromTos ? <div><label htmlFor="routes" className='form-label'>Routes: </label>
                    <div className='form-data'>{flightFromTos.map(flight => <p key={flight.flightFrom}>{flight.flightFrom} - {flight.flightTo}</p>)}</div></div> : ''}
                <label htmlFor="outdated" className='form-label'>Sorry, this flight is outdated! Please look for a newer flight!</label>
            </div>
        </div>
    )
}

export default InvalidBookingForm;