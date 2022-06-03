import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";

import BookingCard from "../../../components/bookings-components/bookings-common-components/booking-card/booking-card.component";
import { db } from "../../../utils/firebase/firebase.utils";

import './find-booking.styles.scss';

const FindBookingPage = () => {
    const [lastName, setLastName] = useState('');
    const [bookingID, setBookingID] = useState('');
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const bookingsRef = collection(db, 'bookings');
        const q = query(bookingsRef, where("bookingID", "==", bookingID.toUpperCase()), where("lastName", "==", lastName.toUpperCase()), orderBy('created', 'desc'))
        onSnapshot(q, (querySnapshot) => {
            setBookings(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [bookingID, lastName])

    return (
        <div className="find-booking-container">
            <p className="find-booking-title">Find your booking here!</p>
            <label htmlFor="last-name" className='form-label'>Last name(s): </label>
            <input className='form-input' type="text" name="last-name" id="last-name" onChange={(e) => { setLastName(e.target.value) }} />
            <label htmlFor="booking-id" className='form-label'>Booking ID: </label>
            <input className='form-input' type="text" name="booking-id" id="booking-id" onChange={(e) => { setBookingID(e.target.value) }} />
            <div>{bookings.map((booking) => <BookingCard id={booking.id} booking={booking.data} />)}</div>
        </div>
    )
}

export default FindBookingPage;