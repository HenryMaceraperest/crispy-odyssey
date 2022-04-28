import React from "react";

import './history-scroll-card.styles.scss';

const HistoryScrollCard = ({ item }) => {
    const { flightCompany, from, to, flightDistance, startDate, endDate, travelTime, price } = item;
    return (
        <div className="outer-body">
            <p>From: {from}</p>
            <p>To: {to}</p>
            {flightCompany ? <p>Company: {flightCompany}</p> : ''}
            {flightDistance ? <p>Distance: {flightDistance} km</p> : ''}
            {startDate ? <p>Start: {startDate}</p> : ''}
            {endDate ? <p>End: {endDate}</p> : ''}
            {travelTime ? <p>Total time: {travelTime}</p> : ''}
            {price ? <p>Price: {price}€</p> : ''}
        </div>
    )
};

export default HistoryScrollCard;