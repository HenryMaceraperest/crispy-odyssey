import React, { useContext } from 'react';

import { ProductsContext } from '../../../contexts/product.context';
import FlightCard from '../../flight-card/flight-card.component';

const Shop = () => {
    const { products } = useContext(ProductsContext);
    return (
        <div>
            {products.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
            ))}
        </div>
    )
};

export default Shop;