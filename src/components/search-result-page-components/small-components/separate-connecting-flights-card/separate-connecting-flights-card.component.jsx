import React from 'react';

import './separate-connecting-flights-card.styles.scss';

const SeparateConnectingFlightsCard = ({ flight }) => {
    const { company, price, flightStart, flightEnd, distance, flightFrom, flightTo } = flight;
    const start = new Date(flightStart);
    const end = new Date(flightEnd);
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };


    function timeDiff(arrival, departure) {
        let diffInMillisecs = Math.abs(arrival - departure) / 1000;

        const days = Math.floor(diffInMillisecs / 86400);
        const hours = Math.floor(diffInMillisecs / 3600) % 24;
        const minutes = Math.floor(diffInMillisecs / 60) % 60;

        let difference = '';
        if (days > 0) {
            difference += (days === 1) ? `${days} day, ` : `${days} days, `;
        }
        difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;

        difference += (minutes === 0 || minutes === 1) ? `${minutes} minute` : `${minutes} minutes`;

        return difference;
    };

    const travelTime = timeDiff(end, start);

    return (
        <div className='card-wrappper'>
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