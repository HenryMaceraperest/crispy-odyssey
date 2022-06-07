import React from "react";
import { useSelector } from "react-redux";

import { selectBookings } from "../../../../../store/booking/booking.selector";
import BookingDataElement from "../../small-components/booking-data-element/booking-data-element.component";

const InvalidBookingForm = () => {
    const bookingData = useSelector(selectBookings);
    const { flightFromTos, from, to, flightDistance, startDate, endDate, travelTime, price, flightCompany } = bookingData;

    return (
        <div>
            <div className='flight-data'>
                <BookingDataElement htmlFor={from} labelText={'From: '} data={from.toUpperCase()} />
                <BookingDataElement htmlFor={to} labelText={'To: '} data={to.toUpperCase()} />
                <BookingDataElement htmlFor={'flights-distance'} labelText={'Distance: '} data={`${flightDistance} km`} />
                <BookingDataElement htmlFor={'start-date'} labelText={'Start: '} data={startDate} />
                <BookingDataElement htmlFor={'end-date'} labelText={'End: '} data={endDate} />
                <BookingDataElement htmlFor={'travel-time'} labelText={'Total travel time: '} data={travelTime} />
                <BookingDataElement htmlFor={'price'} labelText={'Price: '} data={`$${price}`} />
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