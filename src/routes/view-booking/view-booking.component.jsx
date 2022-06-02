import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";

import BookingCard from "../../components/view-booking-card/view-booking-card.component";
import { db } from "../../utils/firebase/firebase.utils";

import './view-booking.styles.scss';

const ViewBookingPage = () => {
    const search = useLocation().search;
    const lastName = new URLSearchParams(search).get('lastName');
    const bookingID = new URLSearchParams(search).get('bookingID');
    const [booking, setBooking] = useState([]);

    useEffect(() => {
        const bookingsRef = collection(db, 'bookings');
        const q = query(bookingsRef, where("bookingID", "==", bookingID.toUpperCase()), where("lastName", "==", lastName.toUpperCase()), orderBy('created', 'desc'))
        onSnapshot(q, (querySnapshot) => {
            setBooking(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [bookingID, lastName])

    if (booking.length > 0) {
        return (
            <div className="view-booking-container">
                <div><BookingCard id={booking.id} booking={booking[0].data} /></div>
            </div>
        )
    } else {
        return (
            <div>No booking was found.</div>
        )
    }

}

export default ViewBookingPage;