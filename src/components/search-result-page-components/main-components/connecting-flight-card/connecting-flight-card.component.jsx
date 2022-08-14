import React from 'react';

import CombinedConnectingFlightsCard from '../../small-components/combined-connecting-flights-card/combined-connecting-flights-card.component';
import './connecting-flight-card.styles.scss';


const ConnectingFlightCard = ({ flights, from, to }) => {
    return (
        <div className='connecting-flights-wrapper'>
            <div className='combined-connecting-flight'>
                <CombinedConnectingFlightsCard key={"unique"} flights={flights} from={from} to={to} />
            </div>
        </div>
    )

};

export default ConnectingFlightCard;