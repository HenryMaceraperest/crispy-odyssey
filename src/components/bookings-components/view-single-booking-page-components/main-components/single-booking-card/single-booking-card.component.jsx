import React from "react";
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from "../../../../../utils/firebase/firebase.utils";

import './single-booking-card.styles.scss';

const SingleBookingCard = ({ booking, id }) => {
    const { from, to, distance, startDate, endDate, flightDuration, cost, company, flightRoutes, firstName, lastName, bookingID } = booking;

    const deleteClickHandler = async () => {
        const bookingsRef = doc(db, 'bookings', id);
        await deleteDoc(bookingsRef);
    }

    const encodedURI = encodeURIComponent(`http://localhost:3000/viewbooking?last-name=${lastName}&bookingID=${bookingID}`)
    return (
        <div className="booking-container">
            <div className="inner-container">
                <div className="first-container">
                    <div className="booking-id">
                        <span className="id-text">Booking ID:</span>
                        <p className="id-text">{bookingID}</p>
                    </div>
                    <div className="name-container">
                        <span className="name-text">Passenger:</span>
                        <p className="name-text">{lastName}, {firstName}</p>
                    </div>
                    <div className="image-container">
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodedURI}&size=100x100`} alt="" title="" />
                    </div>
                </div>
                <div className="second-container">
                    <p>Flight details:</p>
                </div>
                <div className="third-container">
                    <div className="location-data">
                        <div className="from-data">From: {from}</div>
                        <div className="from-data">Start: {startDate}</div>
                    </div>
                    <div className="location-data">
                        <div className="from-data">To: {to}</div>
                        <div className="from-data">End: {endDate}</div>
                    </div>
                </div>
                <div className="fourth-container">
                    <div className="geo-data">
                        <span className="geo-span">Total flight time: {flightDuration}</span>
                        <span className="geo-span">Distance: {distance} km</span>
                        <span className="geo-span">Total paid: {cost} km</span>
                    </div>
                </div>
                <div className="fifth-container">
                    <div className="flight-routes">
                        <p className="flight-data">Flight routes:</p>
                        <div>{flightRoutes ? flightRoutes.map(flightRoute => <p className="flight-data">{flightRoute.flightFrom} - {flightRoute.flightTo}</p>) : <p>{from} - {to}</p>}</div>
                    </div>
                    <div className="company-info">
                        <p className="company-data">Companies:</p>
                        <div>{company ? company.map(flightProvider => (<p className="company-data">{flightProvider}</p>)) : ''}</div>
                    </div>
                </div>
            </div>
            <div className="cost">
                <button className="button-button" onClick={() => deleteClickHandler()}>Delete</button>
            </div>
        </div>
    )
};

export default SingleBookingCard;