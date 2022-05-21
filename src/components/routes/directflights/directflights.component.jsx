import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectProducts } from '../../../store/product/product.selector';
import { setProducts } from '../../../store/product/product.action';
import FlightCard from '../../flight-card/flight-card.component';

const DirectFlights = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            await fetch('http://localhost:4000')
                .then((response) => response.json())
                .then((result) => dispatch(setProducts(result)))
                .catch((error) => console.log("An error occured!" + error))

        };

        getData();

    }, [dispatch]);

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