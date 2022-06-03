import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";

import BookingCard from "../../../components/bookings-components/bookings-common-components/booking-card/booking-card.component";
import { db } from "../../../utils/firebase/firebase.utils";
import { selectCurrentUser } from "../../../store/user/user.selector";


import './my-bookings.styles.scss';

const MyBookingsPage = () => {

    const [bookings, setBookings] = useState([]);
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        if (!currentUser) {
            return;
        }
        const bookingsRef = collection(db, 'bookings');
        const q = query(bookingsRef, where("email", "==", currentUser.email), orderBy('created', 'desc'))
        const findBookings = async () => await onSnapshot(q, (querySnapshot) => {
            setBookings(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        }
        )
        findBookings()
    }, [currentUser])

    return (
        <div>
            {currentUser ?
                <div>{bookings.length > 0 ? bookings.map((booking) => (<BookingCard id={booking.id} booking={booking.data} />)) : <div className="booking-text">No bookings made yet!</div>}</div>
                : <div className="booking-text">Please log in to view your bookings!</div>}
        </div>
    )
}

export default MyBookingsPage;