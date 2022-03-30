import { useContext } from 'react';

import './flight-card.styles.scss';

import { DetailLabel } from '../detail-label/detail-label.component';
import { FooterItemsContext } from '../../contexts/footer-items.context';

const FlightCard = ({ flight }) => {
    const addFlightToFooter = () => addFlight({ from: flight.from.name, to: flight.to.name, distance: flight.distance });

    const { from, to, distance } = flight;
    const { addFlight } = useContext(FooterItemsContext);

    return (
        <div onClick={addFlightToFooter} className='flight-card-container'>
            <DetailLabel mainText="FROM" subText={from.name}></DetailLabel>
            <DetailLabel mainText="TO" subText={to.name}></DetailLabel>
            <DetailLabel mainText="DISTANCE" subText={distance}></DetailLabel>
            <h1 className='view-text'>Click to view all flights!</h1>
        </div>
    )
};

export default FlightCard;