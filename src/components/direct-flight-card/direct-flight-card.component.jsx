import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { addFlight } from '../../store/history/history.action';
import { selectHistoryItems } from '../../store/history/history.selector';
import { selectValidity } from '../../store/validity/validity.selector';
import { addBooking } from '../../store/booking/booking.action';
import { getRandomID } from '../../utils/random/random.utils';

import './direct-flight-card.styles.scss';

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
    const validity = useSelector(selectValidity);
    const historyItems = useSelector(selectHistoryItems);


    const historyClickHandler = () => {
        getRandomID();
        dispatch(addFlight(historyItems, { flightFromTos: null, id: id, from: from, to: to, flightDistance: distance, startDate: start.toLocaleDateString('en-GB', options), endDate: end.toLocaleDateString('en-GB', options), travelTime: travelTime, price: price, validityDate: validity, flightCompany: [company.name] }));
        dispatch(addBooking({ validityDate: validity, flightFromTos: null, id: id, from: from, to: to, flightDistance: distance, startDate: start.toLocaleDateString('en-GB', options), endDate: end.toLocaleDateString('en-GB', options), travelTime: travelTime, price: price, flightCompany: [company.name] }));
        goToBookHandler();
    };


    return (
        <div className='card-wrapper'>
            <div className='card-component'>
                <label>Company:</label>
                <p>{company.name}</p>
            </div>
            <div className='card-component'>
                <label>Ticket cost:</label>
                <p>€{price}</p>
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
                <p>{distance} km</p>
            </div>
            <div className='card-button'>
                <button onClick={historyClickHandler}>Book this flight!</button>
            </div>
        </div>
    );
};

export default DirectFlightCard;