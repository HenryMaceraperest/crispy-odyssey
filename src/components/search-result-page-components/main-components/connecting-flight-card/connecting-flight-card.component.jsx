import React from 'react';

import SeparateConnectingFlightsCard from '../../small-components/separate-connecting-flights-card/separate-connecting-flights-card.component';
import CombinedConnectingFlightsCard from '../../small-components/combined-connecting-flights-card/combined-connecting-flights-card.component';
import './connecting-flight-card.styles.scss';

// Connecting Flight Card, uses two components to view details of the connecting flights, SeparateConnectingFlightsCard maps through the flights, viewing each flight data separately, then CombinedConnectingFlightsCard calculates and adds up all the data
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