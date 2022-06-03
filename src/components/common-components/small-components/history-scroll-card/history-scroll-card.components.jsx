import React from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { removeFlightFromHistory } from "../../../../store/history/history.action";
import { selectHistoryItems } from "../../../../store/history/history.selector";
import { addBooking } from '../../../../store/booking/booking.action';


import './history-scroll-card.styles.scss';

const HistoryScrollCard = ({ item }) => {
    const { flightFromTos, flightCompany, from, to, flightDistance, startDate, endDate, travelTime, price, validityDate } = item;

    const historyItems = useSelector(selectHistoryItems);

    const dispatch = useDispatch();

    const removeClickHandler = () => {
        dispatch(removeFlightFromHistory(historyItems, item))
    };

    const navigate = useNavigate();

    const goToBookHandler = () => {
        navigate('/book');
    }


    const timeNow = new Date().toISOString();
    let isValid = false;
    if (timeNow < validityDate) {
        isValid = true;
    } else {
        isValid = false;
    }

    const bookingClickHandler = () => {
        dispatch(addBooking({ validityDate: validityDate, flightFromTos: flightFromTos, from: from, to: to, flightDistance: flightDistance, startDate: startDate, endDate: endDate, travelTime: travelTime, price: price, flightCompany: flightCompany }));
        goToBookHandler();
    };
    if (isValid) {
        return (
            <div className="outer-body" >
                <button className="button-button" onClick={removeClickHandler}>X</button>
                <div onClick={bookingClickHandler}>
                    <p>From: {from}</p>
                    <p>To: {to}</p>
                    {flightCompany ? <div>Company: {flightCompany.map(x => <p key={x}>{x}</p>)}</div> : ''}
                    {flightDistance ? <p>Distance: {flightDistance} km</p> : ''}
                    {startDate ? <p>Start: {startDate}</p> : ''}
                    {endDate ? <p>End: {endDate}</p> : ''}
                    {travelTime ? <p>Total time: {travelTime}</p> : ''}
                    {price ? <p>Price: {price}€</p> : ''}
                </div>
            </div>
        );
    } else {
        return (
            <div className="outer-body-outdated">
                <button className="button-button" onClick={removeClickHandler}>X</button>
                <p>OUTDATED</p>
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
    }

};

export default HistoryScrollCard;