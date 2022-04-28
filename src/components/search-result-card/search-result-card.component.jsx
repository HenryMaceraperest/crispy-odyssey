import React, { useContext } from 'react';

import { HistoryItemsContext } from '../../contexts/history-items.context';
import './search-result-card.styles.scss';

const SearchResultCard = ({ flight, from, to, distance }) => {
    const { id, company, price, flightStart, flightEnd } = flight;
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

    const { addFlight } = useContext(HistoryItemsContext);

    const historyClickHandler = () => {
        addFlight({ id: id, from: from, to: to, flightDistance: distance, startDate: start.toLocaleDateString('en-GB', options), endDate: end.toLocaleDateString('en-GB', options), travelTime: travelTime, price: price, flightCompany: company.name })
    };


    return (
        <div className='card-wrapper'>
            <div className='card-component'>
                <label>Company:</label>
                <p>{company.name}</p>
            </div>
            <div className='card-component'>
                <label>Ticket cost:</label>
                <p>{price}</p>
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
                <p>{distance}</p>
            </div>
            <div className='card-button'>
                <button onClick={historyClickHandler}>Book this flight!</button>
            </div>
        </div>
    );
};

export default SearchResultCard;