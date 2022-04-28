import { useContext } from 'react';
import { Link } from 'react-router-dom';

import './flight-card.styles.scss';

import { DetailLabel } from '../detail-label/detail-label.component';
import { HistoryItemsContext } from '../../contexts/history-items.context';

const FlightCard = ({ flight }) => {
    const addFlightToHistory = () => addFlight({ from: flight.from.name, to: flight.to.name, distance: flight.distance });

    const { from, to, distance } = flight;
    const { addFlight } = useContext(HistoryItemsContext);

    return (
        <Link to={`/search?from=${from.name}&to=${to.name}`} state={{ from: from.name, to: to.name, distance: distance }} onClick={addFlightToHistory} className='flight-card-container'>
            <DetailLabel mainText="FROM" subText={from.name}></DetailLabel>
            <DetailLabel mainText="TO" subText={to.name}></DetailLabel>
            <DetailLabel mainText="DISTANCE" subText={distance}></DetailLabel>
            <h1 className='view-text'>Click to view all flights!</h1>
        </Link>
    )
};

export default FlightCard;