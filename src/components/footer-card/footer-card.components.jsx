import React from "react";

import './footer-card.styles.scss';

const FooterCard = ({ item }) => {
    const { from, to, distance,/* startDate, endDate, travelTime,  price */ } = item;
    return (
        <div className="outer-body">
            <p>From: {from}</p>
            <p>To: {to}</p>
            <p>Distance: {distance}</p>
            {/* <p>Start: {startDate}</p>
            <p>End: {endDate}</p>
            <p>Total: {travelTime}</p> 
            <p>€{price}</p> */}
        </div>
    )
};

export default FooterCard;