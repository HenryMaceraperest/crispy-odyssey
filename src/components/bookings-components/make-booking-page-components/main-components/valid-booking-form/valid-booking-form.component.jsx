import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, Timestamp } from "firebase/firestore";

import { selectBookings, selectBookingID } from "../../../../../store/booking/booking.selector";
import { db } from "../../../../../utils/firebase/firebase.utils";

import './valid-booking-form.styles.scss';

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
