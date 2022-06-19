import React from "react";
import { useNavigate } from "react-router-dom";

import './booking-card.styles.scss';


// BookingCard is a component used to display a specific booking in find-booking.component & to display all bookings made with your email at my-bookings.component

/** BookingCard component, takes 'booking' as props, then deconstructs the different data from booking to display data */
const BookingCard = ({ booking }) => {
    const { from, to, distance, startDate, endDate, flightDuration, cost, company, flightRoutes, firstName, lastName, bookingID } = booking;
    const navigate = useNavigate()

    // after clicking on the BookingCard, it will navigate to a single view booking card
    const onClickHandler = () => {
        navigate(`/viewbooking?last-name=${lastName}&bookingID=${bookingID}`)
    }

    return (
        <div className="booking-container" onClick={() => onClickHandler()}>
            <div className="inner-container">
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
                <p>€ {cost}</p>
            </div>
        </div>
    )
};

export default BookingCard;