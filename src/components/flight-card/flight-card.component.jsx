import './flight-card.styles.scss';

import { DetailLabel } from '../detail-label/detail-label.component';

const FlightCard = ({ flight }) => {
    const { from, to, distance } = flight;
    return (
        <div className='flight-card-container'>
            <DetailLabel mainText="FROM" subText={from.name}></DetailLabel>
            <DetailLabel mainText="TO" subText={to.name}></DetailLabel>
            <DetailLabel mainText="DISTANCE" subText={distance}></DetailLabel>
            <h1 className='view-text'>Click to view all flights!</h1>
        </div>
    )
};

export default FlightCard;