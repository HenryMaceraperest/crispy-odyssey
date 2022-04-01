import React from "react";

import './history-scroll-card.styles.scss';

const HistoryScrollCard = ({ item }) => {
    const { from, to, distance, startDate, endDate, travelTime, price } = item;
    return (
        <div className="outer-body">
            <p>From: {from}</p>
            <p>To: {to}</p>
            <p>Distance: {distance}</p>
            {startDate ? <p>Start: </p> : ''}
            {endDate ? <p>End: </p> : ''}
            {travelTime ? <p>Total time: </p> : ''}
            {price ? <p>Price: </p> : ''}
        </div>
    )
};

export default HistoryScrollCard;