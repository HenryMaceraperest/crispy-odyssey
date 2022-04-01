import React from 'react';

import './search-result-card.styles.scss';

const SearchResultCard = ({ flight, from, to }) => {
    const { company, price, flightStart, flightEnd } = flight;
    const start = new Date(flightStart);
    const end = new Date(flightEnd);
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

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
            <div className='card-button'>
                <button>Book this flight!</button>
            </div>
        </div>
    );
};

export default SearchResultCard;