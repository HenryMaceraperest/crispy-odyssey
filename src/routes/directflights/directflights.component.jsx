import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectRoutes } from '../../store/route/route.selector';
import { setRoutes } from '../../store/route/route.action';
import FlightCard from '../../components/direct-flights-page-components/main-components/flight-card/flight-card.component';

/** Component that displays the direct flights */
const DirectFlights = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            await fetch(process.env.REACT_APP_ROUTES_API)
                .then((response) => response.json())
                .then((result) => dispatch(setRoutes(result)))
                .catch((error) => console.log("An error occured!" + error))

        };

        getData();

    }, [dispatch]);

    const products = useSelector(selectRoutes);

    return (
        <div>
            {products.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
            ))}
        </div>
    )
};

export default DirectFlights;