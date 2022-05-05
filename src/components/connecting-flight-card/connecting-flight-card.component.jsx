import React from 'react';

import SeparateConnectingFlightsCard from '../separate-connecting-flights-card/separate-connecting-flights-card.component';
import CombinedConnectingFlightsCard from '../combined-connecting-flights-card/combined-connecting-flights-card.component';
import './connecting-flight-card.styles.scss';

const ConnectingFlightCard = ({ flights, from, to }) => {
    return (
        <div className='connecting-flights-wrapper'>
            <div className='separate-connecting-flights'>
                <h2>{flights.map(flight => (
                    <SeparateConnectingFlightsCard key={flight.id} flight={flight} />
                ))}</h2>
            </div>
            <div className='combined-connecting-flight'>
                <CombinedConnectingFlightsCard key={"unique"} flights={flights} from={from} to={to} />
            </div>
        </div>
    )

};

export default ConnectingFlightCard;