import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { HistoryItemsContext } from '../../contexts/history-items.context';
import { BookingDataContext } from '../../contexts/book-item.context';

import './combined-connecting-flights-card.styles.scss';

const CombinedConnectingFlightsCard = ({ flights, from, to }) => {
    const [combinedFlightCompanies, setCombinedFlightCompanies] = useState([]);
    const [combinedFlightCost, setCombinedFlightCost] = useState(0);
    const [firstFlightStart, setFirstFlightStart] = useState('');
    const [lastFlightEnd, setLastFlightEnd] = useState('');
    const [combinedFlightTime, setCombinedFlightTime] = useState('');
    const [combinedFlightDistance, setCombinedFlightDistance] = useState(0);

    flights.map(flight => (
        (setCombinedFlightCompanies(combinedFlightCompanies.push(flight.company.name)),
            (setCombinedFlightCost(combinedFlightCost + flight.cost)),
            (setCombinedFlightDistance(combinedFlightDistance + flight.distance))
        )));

    setFirstFlightStart(flights[0].flightStart);

    const lastFlight = flights[flights.length - 1];

    setLastFlightEnd(lastFlight.flightEnd);

    const start = new Date(firstFlightStart);
    const end = new Date(lastFlightEnd);
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

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

    setCombinedFlightTime(timeDiff(end, start));

    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/book');
    }

    const { addFlight } = useContext(HistoryItemsContext);
    const { addToBook } = useContext(BookingDataContext);

    const historyClickHandler = () => {
        addFlight({ id: 'connecting-flight', from: from, to: to, flightDistance: combinedFlightDistance, startDate: start.toLocaleDateString('en-GB', options), endDate: end.toLocaleDateString('en-GB', options), travelTime: combinedFlightTime, price: combinedFlightCost, flightCompany: combinedFlightCompanies });
        addToBook({ id: 'connecting-flight', from: from, to: to, flightDistance: combinedFlightDistance, startDate: start.toLocaleDateString('en-GB', options), endDate: end.toLocaleDateString('en-GB', options), travelTime: combinedFlightTime, price: combinedFlightCost, flightCompany: combinedFlightCompanies });
        goToCheckoutHandler();
    };

    return (
        <div className='card-wrapper'>
            <div className='card-component'>
                <label>Companies:</label>
                {combinedFlightCompanies.map(company => (
                    <p>{company.name}</p>
                ))}
            </div>
            <div className='card-component'>
                <label>Combined cost:</label>
                <p>€{combinedFlightCost}</p>
            </div>
            <div className='card-component'>
                <label>First flight start: </label>
                <p>{start.toLocaleDateString('en-GB', options)}</p>
            </div>
            <div className='card-component'>
                <label>Last flight end:</label>
                <p>{end.toLocaleDateString('en-GB', options)}</p>
            </div>
            <div className='card-component'>
                <label>Combined total flight time:</label>
                <p>{combinedFlightTime}</p>
            </div>
            <div className='card-component'>
                <label>Combined flight distance:</label>
                <p>{combinedFlightDistance} km</p>
            </div>
            <div className='card-button'>
                <button onClick={historyClickHandler}>Book this flight!</button>
            </div>
        </div>
    );
};

export default CombinedConnectingFlightsCard;