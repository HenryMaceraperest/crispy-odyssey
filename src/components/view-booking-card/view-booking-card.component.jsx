import React from "react";

import './view-booking-card.styles.scss';

const BookingCard = ({ booking }) => {
    const { from, to, distance, startDate, endDate, flightDuration, cost, company, flightRoutes, firstName, lastName, bookingID } = booking;

    return (
        <div className="booking-container">
            <div className="inner-container">
                <div className="first-container">
                    <div className="booking-id">
                        <p className="id-text">{bookingID}</p>
                    </div>
                    <div className="name-container">
                        <span className="name-text">Booking for:</span>
                        <p className="name-text"> {firstName} {lastName}</p>
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
                        <p>{company ? company.map(flightProvider => (<p>{flightProvider}</p>)) : ''}</p>
                    </div>
                </div>
                <div className="third-container">
                    <div className="geo-data">
                        <span className="geo-span">{distance} km</span>
                        <span className="geo-span">{flightDuration}</span>
                    </div>
                    <div className="flight-routes">
                        <p>{flightRoutes ? <p className="flight-data">Routes:</p> : ''}</p>
                        <p>{flightRoutes ? flightRoutes.map(flightRoute => <p className="flight-data">{flightRoute.flightFrom} - {flightRoute.flightTo}</p>) : ''}</p>
                    </div>

                </div>
            </div>
            <div className="cost">
                <button className="button-button" onClick={console.log('Deleted!')}>Delete</button>
                <p>Total: € {cost}.</p>
            </div>
        </div>
    )
};

export default BookingCard;