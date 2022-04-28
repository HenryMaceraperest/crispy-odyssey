import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import './search.styles.scss';

import SearchResultCard from "../../search-result-card/search-result-card.component";

const Search = () => {
    const [flights, setFlights] = useState([]);
    const location = useLocation();
    const search = location.search;
    const distance = location.state.distance;

    const fromQuery = new URLSearchParams(search).get('from');
    const toQuery = new URLSearchParams(search).get('to');

    useEffect(() => {
        const search = location.search;

        const fromQuery = new URLSearchParams(search).get('from');
        const toQuery = new URLSearchParams(search).get('to');
        const fetch = async () => {
            try {
                console.log(fromQuery);
                console.log(toQuery);
                const response = await axios.get(`http://localhost:4000/searchres?from=${fromQuery}&to=${toQuery}`);
                setFlights(response.data)
            } catch (error) {
                console.error(error);
            }
        };
        fetch();
    }, [location]);
    return (
        <div className="search-body">
            <h1>From {fromQuery} To {toQuery}</h1>
            <h2>{flights.map(flight => (

                <SearchResultCard key={flight.id} flight={flight} distance={distance} from={fromQuery} to={toQuery} />

            ))}</h2>
        </div>
    )
};

export default Search;