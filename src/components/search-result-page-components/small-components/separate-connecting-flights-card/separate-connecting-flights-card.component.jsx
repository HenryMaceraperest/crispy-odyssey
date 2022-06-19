import React from 'react';

import { timeDiff } from '../../../../utils/calculate-time-difference/time-difference.utils';

import './separate-connecting-flights-card.styles.scss';

// Flights card that is for connecting-flights, shows details for each individual flight, without the possibility to book separately
const SeparateConnectingFlightsCard = ({ flight }) => {
    const { company, price, flightStart, flightEnd, distance, flightFrom, flightTo } = flight;
    const start = new Date(flightStart);
    const end = new Date(flightEnd);
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    const travelTime = timeDiff(end, start);

    return (
        <div className='card-wrapper'>
            <div className='card-component'>
                <label>Company:</label>
                <p>{company.name}</p>
            </div>
            <div className='card-component'>
                <label>Flight from:</label>
                <p>{flightFrom}</p>
            </div>
            <div className='card-component'>
                <label>Flight to:</label>
                <p>{flightTo}</p>
            </div>
            <div className='card-component'>
                <label>Ticket cost:</label>
                <p>€{price}</p>
            </div>
            <div className='card-component'>
                <label>Flight start: </label>
                <p>{start.toLocaleDateString('en-GB', options)}</p>
            </div>
            <div className='card-component'>
                <label>Flight end:</label>
                <p>{end.toLocaleDateString('en-GB', options)}</p>
            </div>
            <div className='card-component'>
                <label>Total flight time:</label>
                <p>{travelTime}</p>
            </div>
            <div className='card-component'>
                <label>Distance:</label>
                <p>{distance} km</p>
            </div>
        </div>
    );
};

export default SeparateConnectingFlightsCard;