import React from 'react';

import SeparateConnectingFlightsCard from '../../small-components/separate-connecting-flights-card/separate-connecting-flights-card.component';
import CombinedConnectingFlightsCard from '../../small-components/combined-connecting-flights-card/combined-connecting-flights-card.component';
import './connecting-flight-card.styles.scss';

// Connecting Flight Card, uses two components to view details of the connecting flights, SeparateConnectingFlightsCard maps through the flights, viewing each flight data separately, then CombinedConnectingFlightsCard calculates and adds up all the data
/** Component that takes three parameters: flights(the flights array), from(starting planet's name), to(destination planet's name). It maps through the array to display all the connecting flights separately, and then shows the combined data of the flights */
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