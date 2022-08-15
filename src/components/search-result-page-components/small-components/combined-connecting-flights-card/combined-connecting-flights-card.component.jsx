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
/** Component that takes three arguments: flights(all of the flights in the connecting flight), from(planet form which the first flight takes place), to(last planet that is the final destination) */
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
    let flightFromTos = flights.map(({ from, to }) => ({ from, to }));
    let initialValue = 0;

    const lastFlight = flights[flights.length - 1];

    const start = new Date(flights[0].flightStart);
    const end = new Date(lastFlight.flightEnd);
    let options = { timeZone: 'UTC', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    const travelTime = timeDiff(end, start);


    const sum = collectionCosts.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        initialValue
    );
    const sum2 = collectionDistance.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        initialValue
    );

    let flights_ids = flights.map(flight => flight.id).join('');

    const validity = useSelector(selectValidity);

    const historyItems = useSelector(selectHistoryItems);

    const historyClickHandler = () => {
        dispatch(addFlight(historyItems, { flightFromTos: flightFromTos, id: flights_ids, from: from, to: to, flightDistance: sum2, startDate: start.toLocaleDateString('en-GB', options), endDate: end.toLocaleDateString('en-GB', options), travelTime: travelTime, price: round(sum, 2), validityDate: validity, flightCompany: collectionCompanies }));
        dispatch(addBooking({ validityDate: validity, flightFromTos: flightFromTos, id: flights_ids, from: from, to: to, flightDistance: sum2, startDate: start.toLocaleDateString('en-GB', options), endDate: end.toLocaleDateString('en-GB', options), travelTime: travelTime, price: round(sum, 2), flightCompany: collectionCompanies }));
        goToBookHandler();
    };

    return (
        <div className='card-wraper' onClick={() => historyClickHandler()}>
            <div className='card-component'>
                <div>{collectionCompanies.map(
                    x =>
                        <p key={x}>&#x1F680; {x}</p>
                )}</div>
            </div>
            <div className='card-component'>
                <p>{start.toLocaleDateString('en-GB', options)}</p>
                <p>{end.toLocaleDateString('en-GB', options)}</p>
            </div>

            <div className='card-component'>
                <p>{sum2} km</p>
                <p>{travelTime}</p>
            </div>
            <div className='card-component'>
                {flightFromTos.map((flight) =>
                    <p key={flight.from}>{flight.from} - {flight.to}</p>
                )}
            </div>
            <div className='card-component-price'>
                <p className='price-text'>€{round(sum, 2)}</p>
            </div>
            <div className='card-component'>
                <p className='book-flight-text'>Book flight?</p>
            </div>
        </div>
    );
};

export default CombinedConnectingFlightsCard;