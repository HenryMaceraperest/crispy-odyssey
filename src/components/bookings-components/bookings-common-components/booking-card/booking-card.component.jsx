import React from "react";
import { useNavigate } from "react-router-dom";
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from "../../../../utils/firebase/firebase.utils";

import './booking-card.styles.scss';

const BookingCard = ({ booking, id }) => {
    const { from, to, distance, startDate, endDate, flightDuration, cost, company, flightRoutes, firstName, lastName, bookingID } = booking;

    const deleteClickHandler = async () => {
        const bookingsRef = doc(db, 'bookings', id);

        await deleteDoc(bookingsRef);
    }
    const navigate = useNavigate()
    const onClickHandler = () => {
        navigate(`/viewbooking?last-name=${lastName}&bookingID=${bookingID}`)
    }

    return (
        <div className="booking-container">
            <div onClick={() => onClickHandler()} className="inner-container">
                <div className="first-container">
                    <div className="booking-id">
                        <p className="id-text">{bookingID}</p>
                    </div>
                    <div className="name-container">
                        <span className="name-text">Booking for:</span>
                        <p className="name-text">{lastName}, {firstName}</p>
                    </div>
                </div>
                <div className="second-container">
                    <div className="location-data">
                        <div className="from-data">
                            <span className="from-span">{startDate}</span>
                            <span className="from-span"> &#x1F680; {from}</span>
                        </div>
                        <div className="underline" />
                        <div className="to-data">
                            <span className="to-span">{endDate}</span>
                            <span className="to-span">&#x1F680; {to}</span>
                        </div>
                    </div>
                    <div className="company-info">
                        <div>{company ? company.map(flightProvider => (<p>{flightProvider}</p>)) : ''}</div>
                    </div>
                </div>
                <div className="third-container">
                    <div className="geo-data">
                        <span className="geo-span">{distance} km</span>
                        <span className="geo-span">{flightDuration}</span>
                    </div>
                    <div className="flight-routes">
                        <div>{flightRoutes ? <p className="flight-data">Routes:</p> : ''}</div>
                        <div>{flightRoutes ? flightRoutes.map(flightRoute => <p className="flight-data">{flightRoute.flightFrom} - {flightRoute.flightTo}</p>) : ''}</div>
                    </div>
                </div>
            </div>
            <div className="cost">
                <button className="button-button" onClick={() => deleteClickHandler()}>Delete</button>
                <p>€ {cost}</p>
            </div>
        </div>
    )
};

export default BookingCard;