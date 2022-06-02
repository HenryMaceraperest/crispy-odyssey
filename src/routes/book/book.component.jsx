import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { db } from '../../utils/firebase/firebase.utils';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

import { selectBookingID, selectBookings } from '../../store/booking/booking.selector';
import { setBookingID } from '../../store/booking/booking.action';

import './book.styles.scss';

const BookingPage = () => {
    // bookingData contains id, from, to, flightDistance, startDate, endDate, travelTime, price, flightCompany
    const bookingData = useSelector(selectBookings);

    const { validityDate, flightFromTos, from, to, flightDistance, startDate, endDate, travelTime, price, flightCompany } = bookingData;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [randomBookingID, setRandomBookingID] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        const getRandomID = async () => {
            await axios.post('https://api.random.org/json-rpc/4/invoke', [
                {
                    "jsonrpc": "2.0",
                    "method": "generateStrings",
                    "params": {
                        "apiKey": "8b251143-a233-4436-a5dd-30ec7a9d3be6",
                        "n": 1,
                        "length": 6,
                        "characters": "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789",
                        "replacement": true,
                        "pregeneratedRandomization": null
                    },
                    "id": 1378
                }
            ], [
                { headers: { 'Content-Type': 'application/JSON' } }
            ])
                .then((result) => dispatch(setBookingID(result.data[0].result.random.data[0])))
                .catch((e) => console.log(e))
        };
        getRandomID();
    }, [dispatch]);

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



    const randomId = useSelector(selectBookingID);

    const timeNow = new Date().toISOString();
    let isValid = false;
    if (timeNow < validityDate) {
        isValid = true;
    } else {
        isValid = false;
    }
    if (isValid) {
        return (
            <div>
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
            </div>
        )
    } else {
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
};

export default BookingPage;