import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import './search.styles.scss';

import SearchResultCard from "../../search-result-card/search-result-card.component";

const Search = () => {
    const [flights, setFlights] = useState([]);
    const location = useLocation();
    const search = location.search;
    const [connectingFlight, setConnectingFlight] = useState(false);

    const fromQuery = new URLSearchParams(search).get('from');
    const toQuery = new URLSearchParams(search).get('to');

    useEffect(() => {
        const search = location.search;

        const fromQuery = new URLSearchParams(search).get('from');
        const toQuery = new URLSearchParams(search).get('to');
        const dateQuery = new URLSearchParams(search).get('date');

        const fetch = async () => {
            try {
                if (!dateQuery) {
                    const response = await axios.get(`http://localhost:4000/searchres?from=${fromQuery}&to=${toQuery}`);
                    setFlights(response.data);
                } else {
                    const response = await axios.get(`http://localhost:4000/searchres?from=${fromQuery}&to=${toQuery}&date=${dateQuery}`);
                    setFlights(response.data)
                    response.data[0].directFlight ? setConnectingFlight(false) : setConnectingFlight(true)
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetch();
    }, [location]);


    return (
        <div className="search-body">

            <h1>From {fromQuery.toUpperCase()} To {toQuery.toUpperCase()}</h1>
            <h2>{flights.map(flight =>
                <SearchResultCard key={flight.id} flight={flight} from={fromQuery} to={toQuery} />)}</h2>
            {connectingFlight ? <h2>IT IS</h2> : <h2>It's NOT</h2>}
        </div>
    )
};

export default Search;