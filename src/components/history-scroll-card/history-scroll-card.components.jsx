import React, { useContext } from "react";

import { HistoryItemsContext } from "../../contexts/history-items.context";

import { useNavigate } from 'react-router-dom';

import { BookingDataContext } from '../../contexts/book-item.context';

import { ValidityContext } from "../../contexts/validity.context";

import './history-scroll-card.styles.scss';

const HistoryScrollCard = ({ item }) => {
    const { flightCompany, from, to, flightDistance, startDate, endDate, travelTime, price } = item;


    const { removeFlightFromHistory } = useContext(HistoryItemsContext);

    const removeClickHandler = () => {
        removeFlightFromHistory(item)
    };

    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/book');
    }

    const { addToBook } = useContext(BookingDataContext);

    const { isValid } = useContext(ValidityContext);

    console.log(isValid);

    const bookingClickHandler = () => {
        addToBook({ from: from, to: to, flightDistance: flightDistance, startDate: startDate, endDate: endDate, travelTime: travelTime, price: price, flightCompany: flightCompany });
        goToCheckoutHandler();
    };
    return (
        <div className="outer-body" onClick={bookingClickHandler}>
            <div className='remove-button' onClick={removeClickHandler}>X</div>
            <p>From: {from}</p>
            <p>To: {to}</p>
            {flightCompany ? <div>Company: {flightCompany.map(x => <p key={x}>{x}</p>)}</div> : ''}
            {flightDistance ? <p>Distance: {flightDistance} km</p> : ''}
            {startDate ? <p>Start: {startDate}</p> : ''}
            {endDate ? <p>End: {endDate}</p> : ''}
            {travelTime ? <p>Total time: {travelTime}</p> : ''}
            {price ? <p>Price: {price}€</p> : ''}
        </div>
    );
};

export default HistoryScrollCard;