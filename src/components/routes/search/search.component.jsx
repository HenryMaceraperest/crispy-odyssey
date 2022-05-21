import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from "axios";

import './search.styles.scss';

import DirectFlightCard from "../../direct-flight-card/direct-flight-card.component";
import ConnectingFlightCard from "../../connecting-flight-card/connecting-flight-card.component";
import { setValidity } from "../../../store/validity/validity.action";

const Search = () => {
    const [OGflights, setOGFlights] = useState([]);
    const location = useLocation();
    const search = location.search;
    const [connectingFlight, setConnectingFlight] = useState(false);
    const fromQuery = new URLSearchParams(search).get('from');
    const toQuery = new URLSearchParams(search).get('to');

    const dispatch = useDispatch();


    useEffect(() => {
        const getData = async () => {
            await axios.get('http://localhost:4000/time')
                .then(
                    validity => {
                        dispatch(setValidity(validity.data))
                    }, error => {
                        console.log("An error occured, in search.component! Error: " + error);
                    });
        };
        getData();
        const interval = setInterval(() => {
            getData();
        }, 10000)
        return () => clearInterval(interval)
    }, [dispatch]);

    useEffect(() => {
        const search = location.search;

        const fromQuery = new URLSearchParams(search).get('from');
        const toQuery = new URLSearchParams(search).get('to');
        const dateQuery = new URLSearchParams(search).get('date');

        const fetch = async () => {
            try {
                if (!dateQuery) {
                    const response = await axios.get(`http://localhost:4000/searchres?from=${fromQuery}&to=${toQuery}`);
                    setOGFlights(response.data);
                } else {
                    const response = await axios.get(`http://localhost:4000/searchres?from=${fromQuery}&to=${toQuery}&date=${dateQuery}`);
                    setOGFlights(response.data)
                    response.data[0].directFlight ? setConnectingFlight(false) : setConnectingFlight(true)
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetch();
    }, [location]);

    OGflights.forEach(flight => {
        const start =
            new Date(flight.flightStart);
        const end = new Date(flight.flightEnd);
        const travelTimeMS = end - start;
        flight.travelTimeMS = travelTimeMS;
    });

    const sortTravelTimeClickHandlerDesc = () => {
        const sortedFlights = [...OGflights].sort((a, b) => parseFloat(b.travelTimeMS) - parseFloat(a.travelTimeMS));
        setOGFlights(sortedFlights)
    };

    const sortTravelTimeClickHandlerAsc = () => {
        const sortedFlights = [...OGflights].sort((a, b) => parseFloat(a.travelTimeMS) - parseFloat(b.travelTimeMS));
        setOGFlights(sortedFlights)
    };

    const sortDateClickHandlerDesc = () => {
        const sortedFlights = [...OGflights].sort((a, b) => { return new Date(a.flightStart) - new Date(b.flightStart) });
        setOGFlights(sortedFlights)
    };

    const sortDateClickHandlerAsc = () => {
        const sortedFlights = [...OGflights].sort((a, b) => { return new Date(b.flightStart) - new Date(a.flightStart) });
        setOGFlights(sortedFlights)
    };

    const sortPriceClickHandlerDesc = () => {
        const sortedFlights = [...OGflights].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        setOGFlights(sortedFlights)
    };

    const sortPriceClickHandlerAsc = () => {
        const sortedFlights = [...OGflights].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        setOGFlights(sortedFlights)
    };
    const [searchTerm, setSearchTerm] = useState('');

    const flights = OGflights.filter(flight => flight.company.name.toLowerCase().includes(searchTerm));

    const onSearchChange = (event) => { setSearchTerm(event.target.value.toLowerCase()) };

    return (
        <div className="search-body">
            <h1>From {fromQuery.toUpperCase()} To {toQuery.toUpperCase()}</h1>
            <div className='sorting-div'>
                <span className='sorting-span'>
                    <p>Company:</p>
                    <input className="sorting-search-box" placeholder="Search" type="text" name="company-search" onChange={onSearchChange} />
                </span>
                <span className='sorting-span'>
                    <p>Price:</p>
                    <button className='sorting-button' onClick={sortPriceClickHandlerAsc}>Ascending</button>
                    <button className='sorting-button' onClick={sortPriceClickHandlerDesc}>Descending</button>
                </span>
                <span className='sorting-span'>
                    <p>Date:</p>
                    <button className='sorting-button' onClick={sortDateClickHandlerAsc}>Later first</button>
                    <button className='sorting-button' onClick={sortDateClickHandlerDesc}>Earlier first</button>
                </span>
                <span className='sorting-span'>
                    <p>Travel time:</p>
                    <button className='sorting-button' onClick={sortTravelTimeClickHandlerAsc}>Ascending</button>
                    <button className='sorting-button' onClick={sortTravelTimeClickHandlerDesc}>Descending</button>
                </span>
            </div>
            {connectingFlight ? <ConnectingFlightCard key={"unique"} flights={flights} from={fromQuery} to={toQuery} /> :
                <h2>{flights.map(flight =>
                    <DirectFlightCard key={flight.id} flight={flight} from={fromQuery} to={toQuery} />)}</h2>}
        </div>
    )
};

export default Search;