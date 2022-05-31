import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";

import './view-booking.styles.scss';

const ViewBookingPage = () => {
    const [lastName, setLastName] = useState('');
    const [bookingID, setBookingID] = useState('');

    //const [openAddModal, setOpenAddModal] = useState(false);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const bookingsRef = collection(db, 'bookings');
        const q = query(bookingsRef, where("bookingID", "==", bookingID), where("lastName", "==", lastName), orderBy('created', 'desc'))
        onSnapshot(q, (querySnapshot) => {
            setBookings(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [bookingID, lastName])

    return (
        <div>
            <div>View your booking here!</div>
            <p>{console.log(bookings)}</p>
            <div>
                <label htmlFor="last-name" className='form-label'>Last name(s): </label>
                <input className='form-input' type="text" name="last-name" id="last-name" onChange={(e) => { setLastName(e.target.value) }} />
                <label htmlFor="booking-id" className='form-label'>Booking ID: </label>
                <input className='form-input' type="text" name="booking-id" id="booking-id" onChange={(e) => { setBookingID(e.target.value) }} />
            </div>
            <div>{bookings.map((booking) => (
                <div id={booking.data.bookingID}>
                    <p>{booking.data.bookingID}</p>
                    <p>{booking.data.firstName}</p>
                    <p>{booking.data.lastName}</p>
                    <p>{booking.data.cost}</p>
                    <p>{booking.data.startDate}</p>
                </div>
            ))}</div>
        </div>
    )
}

export default ViewBookingPage;