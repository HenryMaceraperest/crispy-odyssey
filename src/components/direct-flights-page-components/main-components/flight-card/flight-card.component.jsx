import { Link } from 'react-router-dom';

import './flight-card.styles.scss';

import { DetailLabel } from '../../small-components/detail-label/detail-label.component';

/** Component that takes {flight} as its state, displays the data: from, to, & distance; On click, links to search results without a specific date */
const FlightCard = ({ flight }) => {

    const { from, to, distance } = flight;

    return (
        <Link to={`/search?from=${from.name}&to=${to.name}`} state={{ from: from.name, to: to.name, distance: distance }} className='flight-card-container'>
            <DetailLabel mainText="FROM" subText={from.name} />
            <DetailLabel mainText="TO" subText={to.name}></DetailLabel>
            <DetailLabel mainText="DISTANCE" subText={distance}></DetailLabel>
            <h1 className='view-text'>Click to view all flights!</h1>
        </Link>
    )
};

export default FlightCard;