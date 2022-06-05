import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";

import SingleBookingCard from "../../../components/bookings-components/view-single-booking-page-components/main-components/single-booking-card/single-booking-card.component";
import { db } from "../../../utils/firebase/firebase.utils";

import './view-single-booking.styles.scss';

const ViewSingleBookingPage = () => {
    const search = useLocation().search;
    const lastName = new URLSearchParams(search).get('last-name');
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
                <div><SingleBookingCard id={booking[0].id} booking={booking[0].data} /></div>
            </div>
        )
    } else {
        return (
            <div>No booking was found.</div>
        )
    }

}

export default ViewSingleBookingPage;