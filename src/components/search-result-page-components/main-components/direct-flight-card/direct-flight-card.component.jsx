import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { addFlight } from '../../../../store/history/history.action';
import { selectHistoryItems } from '../../../../store/history/history.selector';
import { selectValidity } from '../../../../store/validity/validity.selector';
import { addBooking } from '../../../../store/booking/booking.action';
import { timeDiff } from '../../../../utils/calculate-time-difference/time-difference.utils';

import './direct-flight-card.styles.scss';

// Shows all direct flights & their data, on click takes to the booking form & adds booking data to the history component
const DirectFlightCard = ({ flight, from, to }) => {
    const { id, company, price, flightStart, flightEnd, distance } = flight;
    const start = new Date(flightStart);
    const end = new Date(flightEnd);
    const dispatch = useDispatch();

    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    const navigate = useNavigate();

    const goToBookHandler = () => {
        navigate('/book');
    }

    const travelTime = timeDiff(end, start);
    const validity = useSelector(selectValidity);
    const historyItems = useSelector(selectHistoryItems);


    const historyClickHandler = () => {
        dispatch(addFlight(historyItems, { flightFromTos: null, id: id, from: from, to: to, flightDistance: distance, startDate: start.toLocaleDateString('en-GB', options), endDate: end.toLocaleDateString('en-GB', options), travelTime: travelTime, price: price, validityDate: validity, flightCompany: [company.name] }));
        dispatch(addBooking({ validityDate: validity, flightFromTos: null, id: id, from: from, to: to, flightDistance: distance, startDate: start.toLocaleDateString('en-GB', options), endDate: end.toLocaleDateString('en-GB', options), travelTime: travelTime, price: price, flightCompany: [company.name] }));
        goToBookHandler();
    };


    return (
        <div className='card-wraper' onClick={historyClickHandler}>
            <div className='card-component'>
                <p>&#x1F680; {company.name}</p>
            </div>
            <div className='card-component'>
                <p>{start.toLocaleDateString('en-GB', options)}</p>

                <p>{end.toLocaleDateString('en-GB', options)}</p>
            </div>
            <div className='card-component'>
                <p>{distance} km</p>
                <p>{travelTime}</p>
            </div>
            <div className='card-component-price'>
                <p className='price-text'>€ {price}</p>
            </div>
            <div className='card-component'>
                <p className='book-flight-text'>Book flight?</p>
            </div>
        </div>
    );
};

export default DirectFlightCard;