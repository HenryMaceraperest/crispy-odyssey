import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";

import './search-result.styles.scss';

import DirectFlightCard from "../../components/search-result-page-components/main-components/direct-flight-card/direct-flight-card.component";
import ConnectingFlightCard from "../../components/search-result-page-components/main-components/connecting-flight-card/connecting-flight-card.component";
import Custom400Error from "../../components/common-components/main-components/custom-error-400-page/custom-400.component";
import ChangeDate from "../../components/search-result-page-components/main-components/change-date/change-date.component";
import capitalizeFirst from "../../utils/capitalizeFirst";
import SortingSpan from "../../components/search-result-page-components/small-components/sorting-span/sorting-span.component";

import { setValidity } from "../../store/validity/validity.action";
import { setRoutes } from "../../store/route/route.action";
import { selectRoutes } from "../../store/route/route.selector";

const SearchResult = () => {
    const [OGflights, setOGFlights] = useState([]);
    const location = useLocation();
    const search = location.search;
    const fromQuery = new URLSearchParams(search).get('from');
    const toQuery = new URLSearchParams(search).get('to');
    const dateQuery = new URLSearchParams(search).get('date');
    const locations = [];

    const dispatch = useDispatch();


    useEffect(() => {
        const getData = async () => {
            await axios.get(process.env.REACT_APP_VALIDUNTIL_API)
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
        }, 60000)
        return () => clearInterval(interval)
    }, [dispatch]);

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

    for (let location of products) {
        if (!locations.includes(location.from.name)) {
            locations.push(location.from.name.toLowerCase())
        }
        if (!locations.includes(location.to.name)) {
            locations.push(location.to.name.toLowerCase())
        }
    }

    useEffect(() => {
        const search = location.search;

        const fromQuery = capitalizeFirst(new URLSearchParams(search).get('from'));
        const toQuery = capitalizeFirst(new URLSearchParams(search).get('to'));
        const dateQuery = new URLSearchParams(search).get('date');
        const API_URL = process.env.REACT_APP_SEARCH_RESULT_API;

        const fetch = async () => {
            try {
                if (!dateQuery) {
                    const response = await axios.get(`${API_URL}?from=${fromQuery}&to=${toQuery}`);
                    setOGFlights(response.data);
                } else {
                    await axios.get(`${API_URL}?from=${fromQuery}&to=${toQuery}&date=${dateQuery}`)
                        .then(response => setOGFlights(response.data))
                        .catch(function (error) {
                            if (error.response) {
                                console.log(error.response.data);
                            } else {
                                console.log('Error', error.message);
                            }
                        });
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, [location]);

    // set the flights data from the api, if it's a direct flight, set the flight data on top level, if connected flight, then combined data on top level
    [...OGflights].forEach(flight => {
        if (flight.length === 1) {
            const start = new Date(flight[0].flightStart);
            const end = new Date(flight[0].flightEnd);
            const travelTimeMS = end - start;
            flight.travelTimeMS = travelTimeMS;
            flight.price = flight[0].price;
            flight.flightStart = flight[0].flightStart;
            flight.flightEnd = flight[0].flightEnd;
            flight.distance = flight[0].distance;

        } else {
            const start = new Date(flight[0].flightStart);
            const end = new Date(flight[flight.length - 1].flightEnd);
            const travelTimeMS = end - start;
            flight.travelTimeMS = travelTimeMS;
            let collectionCosts = flight.map((flight) => flight.price);
            let collectionDistance = flight.map((flight) => flight.distance);
            let initialValue = 0;
            const sum = collectionCosts.reduce(
                (previousValue, currentValue) => previousValue + currentValue,
                initialValue
            );
            const sum2 = collectionDistance.reduce(
                (previousValue, currentValue) => previousValue + currentValue,
                initialValue
            );
            flight.flightStart = flight[0].flightStart;
            flight.flightEnd = flight[flight.length - 1].flightEnd;
            flight.price = sum;
            flight.distance = sum2;
        }
    });

    /** Sorts the flights array based on the travel time, descending */
    const sortTravelTimeClickHandlerDesc = () => {
        const sortedFlights = [...OGflights].sort((a, b) => parseFloat(b.travelTimeMS) - parseFloat(a.travelTimeMS));
        setOGFlights(sortedFlights)
    };

    /** Sorts the flights array based on the travel time, ascending */
    const sortTravelTimeClickHandlerAsc = () => {
        const sortedFlights = [...OGflights].sort((a, b) => parseFloat(a.travelTimeMS) - parseFloat(b.travelTimeMS));
        setOGFlights(sortedFlights)
    };

    /** Sorts the flights array based on the travel start date, descending */
    const sortDateClickHandlerDesc = () => {
        const sortedFlights = [...OGflights].sort((a, b) => { return new Date(a.flightStart) - new Date(b.flightStart) });
        setOGFlights(sortedFlights)
    };

    /** Sorts the flights array based on the travel start date, ascending */
    const sortDateClickHandlerAsc = () => {
        const sortedFlights = [...OGflights].sort((a, b) => { return new Date(b.flightStart) - new Date(a.flightStart) });
        setOGFlights(sortedFlights)
    };

    /** Sorts the flights array based on the price, descending */
    const sortPriceClickHandlerDesc = () => {
        const sortedFlights = [...OGflights].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        setOGFlights(sortedFlights)
    };

    /** Sorts the flights array based on the price, ascending */
    const sortPriceClickHandlerAsc = () => {
        const sortedFlights = [...OGflights].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        setOGFlights(sortedFlights)
    };

    /** Sorts the flights array based on the distance, descending */
    const sortDistanceClickHandlerDesc = () => {
        const sortedFlights = [...OGflights].sort((a, b) => parseFloat(b.distance) - parseFloat(a.distance));
        setOGFlights(sortedFlights)
    };

    /** Sorts the flights array based on the distance, ascending */
    const sortDistanceClickHandlerAsc = () => {
        const sortedFlights = [...OGflights].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        setOGFlights(sortedFlights)
    };

    const [searchTerm, setSearchTerm] = useState('');

    // checks if the searchTerm is included in the companies' names.
    const flights = OGflights.filter(element => element.some(y => y.company.name.toLowerCase().includes(searchTerm)));

    const onSearchChange = (event) => { setSearchTerm(event.target.value.toLowerCase()) };

    return (
        <div>
            {!locations.includes(fromQuery.toLowerCase()) || !locations.includes(toQuery.toLowerCase()) ?
                <Custom400Error smallText={"No flights on these routes!"} bigText={`${fromQuery} - ${toQuery}`} /> :
                <div className="search-body">
                    <h1 className="title">From {fromQuery.toUpperCase()} To {toQuery.toUpperCase()}</h1>
                    <div>
                        {dateQuery ? <ChangeDate from={fromQuery} to={toQuery} date={dateQuery} /> : ''}
                    </div>
                    <div className='sorting-div'>
                        <span className='sorting-span'>
                            <p>Company:</p>
                            <input className="sorting-search-box" placeholder="Search" type="text" onChange={onSearchChange} />
                        </span>
                        <SortingSpan onClick1={sortPriceClickHandlerAsc} onClick2={sortPriceClickHandlerDesc} title={'Price:'} text1={'Ascending'} text2={'Descending'} />
                        <SortingSpan onClick1={sortDateClickHandlerAsc} onClick2={sortDateClickHandlerDesc} title={'Date:'} text1={'Later first'} text2={'Earlier first'} />
                        <SortingSpan onClick1={sortTravelTimeClickHandlerAsc} onClick2={sortTravelTimeClickHandlerDesc} title={'Time:'} text1={'Ascending'} text2={'Descending'} />
                        <SortingSpan onClick1={sortDistanceClickHandlerAsc} onClick2={sortDistanceClickHandlerDesc} title={'Distance:'} text1={'Ascending'} text2={'Descending'} />
                    </div>
                    <h2>
                        {flights.map(flight => {
                            return <div key={flight[0].id}>{flight.length > 1 ?
                                <ConnectingFlightCard key={flight[0].id} flights={flight} from={fromQuery} to={toQuery} /> :
                                <DirectFlightCard key={flight[0].id} flight={flight[0]} from={fromQuery} to={toQuery} />}</div>
                        })}
                    </h2>
                    <h2>
                        {flights.length === 0 ?
                            <div className="false-text">Sorry, no flights for these locations right now!</div> :
                            ''}
                    </h2>
                </div>
            }
        </div>


    )
};

export default SearchResult;