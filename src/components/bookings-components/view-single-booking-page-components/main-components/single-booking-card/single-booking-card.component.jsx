import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doc, deleteDoc } from 'firebase/firestore';

import { db } from "../../../../../utils/firebase/firebase.utils";
import { selectCurrentUser } from '../../../../../store/user/user.selector';
import BookingCardData from "../../small-components/booking-card-data/booking-card-data.component";

import './single-booking-card.styles.scss';

/** Singular view for the booking, also has component for a QR code, that takes the user to the same page aka for checking the legidity of the ticket/booking */
const SingleBookingCard = ({ booking, id }) => {
    const { from, to, distance, startDate, endDate, flightDuration, cost, company, flightRoutes, firstName, lastName, bookingID } = booking;

    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);

    const deleteClickHandler = async () => {
        const bookingsRef = doc(db, 'bookings', id)

        await deleteDoc(bookingsRef)
        currentUser ? navigate('/mybookings') : navigate('/')
    }

    const encodedURI = encodeURIComponent(`https://lambent-biscuit-216fe3.netlify.app/viewbooking?last-name=${lastName}&bookingID=${bookingID}`)
    return (
        <div className="outer-container">
            <div className="single-booking-container">
                <div className="inner-container">
                    <div className="first-container">
                        <BookingCardData divClassName={'booking-id'} spanClassName={'id-text'} spanText={'Booking ID:'} spanData={bookingID} />
                        <BookingCardData divClassName={'name-container'} spanClassName={'name-text'} spanText={'Passenger:'} spanData={`${lastName}, ${firstName}`} />
                        <div className="image-container">
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodedURI}&size=150x150`} alt="" title="" />
                        </div>
                    </div>
                    <div className="second-container">
                        <p>Flight details:</p>
                    </div>
                    <div className="third-container">
                        <BookingCardData divClassName={'location-data'} spanClassName={'from-data'} spanText={`From: ${from}`} spanData={`Start: ${startDate}`} />
                        <BookingCardData divClassName={'location-data'} spanClassName={'from-data'} spanText={`To: ${to}`} spanData={`End: ${endDate}`} />
                    </div>
                    <div className="fourth-container">
                        <div className="geo-data">
                            <span className="geo-span">Total flight time: {flightDuration}</span>
                            <span className="geo-span">Distance: {distance} km</span>
                            <span className="geo-span">Total paid: € {cost}</span>
                        </div>
                    </div>
                    <div className="fifth-container">
                        <div className="flight-routes">
                            <p className="flight-data">Flight routes:</p>
                            <div>{flightRoutes ? flightRoutes.map(flightRoute => <p className="flight-data">{flightRoute.flightFrom} - {flightRoute.flightTo}</p>) : <p className="flight-data">{from} - {to}</p>}</div>
                        </div>
                        <div className="company-info">
                            <p className="company-data">Companies:</p>
                            <div>{company ? company.map(flightProvider => (<p className="company-data">{flightProvider}</p>)) : ''}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="btn-container">
                {currentUser ?
                    <button className="button" onClick={() => deleteClickHandler()}>Delete</button> : ''}
            </div>
        </div>
    )
};

export default SingleBookingCard;