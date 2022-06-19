import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { addFlight } from '../../../../store/history/history.action';
import { selectHistoryItems } from '../../../../store/history/history.selector';
import { selectValidity } from '../../../../store/validity/validity.selector';
import { addBooking } from '../../../../store/booking/booking.action';
import { timeDiff } from '../../../../utils/calculate-time-difference/time-difference.utils';

import './combined-connecting-flights-card.styles.scss';

// For a connecting-flights flight, adds up all the data to provide a combined overview of all the travel time, cost etc.
const CombinedConnectingFlightsCard = ({ flights, from, to }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goToBookHandler = () => {
        navigate('/book');
    }

    const round = (n, dp) => {
        const h = +('1'.padEnd(dp + 1, '0'))
        return Math.round(n * h) / h
    };

    let collectionCosts = flights.map((flight) => flight.price);
    let collectionDistance = flights.map((flight) => flight.distance);
    let collectionCompanies = flights.map((flight) => flight.company.name);
    let flightFromTos = flights.map(({ flightFrom, flightTo }) => { return { flightFrom, flightTo } });
    let initialValue = 0;

    const lastFlight = flights[flights.length - 1];

    const start = new Date(flights[0].flightStart);
    const end = new Date(lastFlight.flightEnd);
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    const travelTime = timeDiff(end, start);


    const sum = collectionCosts.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        initialValue
    );
    const sum2 = collectionDistance.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        initialValue
    );

    const validity = useSelector(selectValidity);

    const historyItems = useSelector(selectHistoryItems);

    const historyClickHandler = () => {
        dispatch(addFlight(historyItems, { flightFromTos: flightFromTos, from: from, to: to, flightDistance: sum2, startDate: start.toLocaleDateString('en-GB', options), endDate: end.toLocaleDateString('en-GB', options), travelTime: travelTime, price: round(sum, 2), validityDate: validity, flightCompany: collectionCompanies }));
        dispatch(addBooking({ validityDate: validity, flightFromTos: flightFromTos, from: from, to: to, flightDistance: sum2, startDate: start.toLocaleDateString('en-GB', options), endDate: end.toLocaleDateString('en-GB', options), travelTime: travelTime, price: round(sum, 2), flightCompany: collectionCompanies }));
        goToBookHandler();
    };

    return (
        <div className='card-wrrapper' onClick={() => historyClickHandler()}>
            <span className='card-component'>
                <label className='label'>Companies:</label>
                <div>{collectionCompanies.map(
                    x =>
                        <p key={x}>{x}</p>
                )}</div>
            </span>
            <span className='card-component'>
                <label className='label'>From:</label>
                <p>{from}</p>
            </span>
            <span className='card-component'>
                <label className='label'>To:</label>
                <p>{to}</p>
            </span>
            <span className='card-component'>
                <label className='label'>Combined Tickets' cost:</label>
                <p>€{round(sum, 2)}</p>
            </span>
            <span className='card-component'>
                <label className='label'>First flight start: </label>
                <p>{start.toLocaleDateString('en-GB', options)}</p>
            </span>
            <span className='card-component'>
                <label className='label'>Last flight end:</label>
                <p>{end.toLocaleDateString('en-GB', options)}</p>
            </span>
            <span className='card-component'>
                <label className='label'>Total flight time:</label>
                <p>{travelTime}</p>
            </span>
            <span className='card-component'>
                <label className='label'>Travel routes:</label>
                {flightFromTos.map((flight) =>
                    <p key={flight.flightFrom}>{flight.flightFrom} - {flight.flightTo}</p>
                )}
            </span>
            <span className='card-component'>
                <label className='label'>Combined travel distance:</label>
                <p>{sum2} km</p>
            </span>
        </div>
    );
};

export default CombinedConnectingFlightsCard;