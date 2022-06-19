import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, Timestamp } from "firebase/firestore";

import { selectBookings, selectBookingID } from "../../../../../store/booking/booking.selector";
import { db } from "../../../../../utils/firebase/firebase.utils";
import BookingDataElement from "../../small-components/booking-data-element/booking-data-element.component";

import './valid-booking-form.styles.scss';

/** BookingForm that is displayed and can be submitted while the validUntil date-time is earlier than the current date-time & it submits the booking to a firebase database */
const ValidBookingForm = () => {

    const bookingData = useSelector(selectBookings);
    const { flightFromTos, from, to, flightDistance, startDate, endDate, travelTime, price, flightCompany } = bookingData;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [randomBookingID, setRandomBookingID] = useState('');

    const randomId = useSelector(selectBookingID);

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, 'bookings'), {
                from: from,
                to: to,
                distance: flightDistance,
                startDate: startDate,
                endDate: endDate,
                flightDuration: travelTime,
                cost: price,
                company: flightCompany,
                flightRoutes: flightFromTos,
                firstName: firstName,
                lastName: lastName.toUpperCase(),
                email: email,
                bookingID: randomBookingID,
                created: Timestamp.now()
            })
            navigate('/')
        } catch (e) {
            alert(e)
        }
    };

    return (
        <form action="/booking" method="post" onSubmit={submitHandler}>
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
                <label htmlFor="first-name" className='form-label'>First name(s): </label>
                <input className='form-input' type="text" name="first-name" id="first-name" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                <label htmlFor="last-name" className='form-label'>Last name(s): </label>
                <input className='form-input' type="text" name="last-name" id="last-name" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                <label htmlFor="email" className='form-label'>Email: </label>
                <input className='form-input' type="email" name="email" id="email" onChange={(e) => { setEmail(e.target.value) }} />
            </div>
            <button className='form-button' type='submit' onClick={() =>
                setRandomBookingID(randomId)}>Book Flight!</button>
        </form>
    )
}

export default ValidBookingForm;
