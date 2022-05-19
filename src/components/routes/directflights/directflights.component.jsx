import React from 'react';
import { useSelector } from 'react-redux';

import { selectProducts } from '../../../store/product/product.selector';
import FlightCard from '../../flight-card/flight-card.component';

const DirectFlights = () => {

    const products = useSelector(selectProducts);

    return (
        <div>
            {products.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
            ))}
        </div>
    )
};

export default DirectFlights;