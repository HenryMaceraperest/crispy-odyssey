import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from "axios";

import './search-result.styles.scss';

import DirectFlightCard from "../../components/search-result-page-components/main-components/direct-flight-card/direct-flight-card.component";
import ConnectingFlightCard from "../../components/search-result-page-components/main-components/connecting-flight-card/connecting-flight-card.component";
import Custom400Error from "../../components/common-components/main-components/custom-error-400-page/custom-400.component";
import ChangeDate from "../../components/search-result-page-components/main-components/change-date/change-date.component";
import SortingSpan from "../../components/search-result-page-components/small-components/sorting-span/sorting-span.component";

import { setValidity } from "../../store/validity/validity.action";


// If the result is a direct flight, the user can sort the results based on different data & filter based on the company name
/** SEARCH RESULT PAGE, checks whether the flight is a direct flight or connecting flight, based on the from and to locations */
const SearchResult = () => {
    const [OGflights, setOGFlights] = useState([]);
    const location = useLocation();
    const search = location.search;
    const fromQuery = new URLSearchParams(search).get('from');
    const toQuery = new URLSearchParams(search).get('to');
    const dateQuery = new URLSearchParams(search).get('date');

    /* const dateIsValid = dateQuery instanceof Date && !!dateQuery.getDate();

    if (!dateIsValid) {
        dateQuery = new Date().toISOString().split('T')[0];
    } */

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
        const search = location.search;

        const fromQuery = new URLSearchParams(search).get('from');
        const toQuery = new URLSearchParams(search).get('to');
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

    [...OGflights].forEach(flight => {
        var start =
            new Date(flight.flightStart);
        var end = new Date(flight.flightEnd);
        var travelTimeMS = end - start;
        console.log(travelTimeMS)
        flight.travelTimeMS = travelTimeMS;
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
    const [searchTerm, setSearchTerm] = useState('');

    // checks if the searchTerm is included in the companies' names.
    const flights = OGflights.filter(flight => flight.company.name.toLowerCase().includes(searchTerm));

    const onSearchChange = (event) => { setSearchTerm(event.target.value.toLowerCase()) };
    const FQ = fromQuery.toLowerCase();
    const TQ = toQuery.toLowerCase();

    if ((FQ === 'earth' && (TQ === 'jupiter' || TQ === 'uranus')) || (FQ === 'jupiter' && (TQ === 'mars' || TQ === 'venus')) || (FQ === 'mars' && (TQ === 'venus')) || (FQ === 'neptune' && (TQ === 'mercury' || TQ === 'uranus')) || (FQ === 'saturn' && (TQ === 'earth' || TQ === 'neptune')) || (FQ === 'uranus' && (TQ === 'neptune' || TQ === 'saturn')) || (FQ === 'venus' && (TQ === 'earth' || TQ === 'mercury')) || (FQ === 'mercury' && (TQ === 'venus'))) {
        return (
            <div className="search-body">
                <h1 className="title">From {fromQuery.toUpperCase()} To {toQuery.toUpperCase()}</h1>
                <div>{dateQuery ? <ChangeDate from={fromQuery} to={toQuery} date={dateQuery} /> : ''}</div>
                <div className='sorting-div'>
                    <span className='sorting-span'>
                        <p>Company:</p>
                        <input className="sorting-search-box" placeholder="Search" type="text" name="company-search" onChange={onSearchChange} />
                    </span>
                    <SortingSpan onClick1={sortPriceClickHandlerAsc} onClick2={sortPriceClickHandlerDesc} title={'Price:'} text1={'Ascending'} text2={'Descending'} />
                    <SortingSpan onClick1={sortDateClickHandlerAsc} onClick2={sortDateClickHandlerDesc} title={'Date:'} text1={'Later first'} text2={'Earlier first'} />
                    <SortingSpan onClick1={sortTravelTimeClickHandlerAsc} onClick2={sortTravelTimeClickHandlerDesc} title={'Travel time:'} text1={'Ascending'} text2={'Descending'} />
                </div>
                <h2 >{flights.length > 0 ? flights.map(flight =>
                    <DirectFlightCard key={flight.id} flight={flight} from={fromQuery} to={toQuery} />) : <div className="false-text">{`Sorry, no flights available!`}</div>}</h2>
            </div>
        )
    } else if ((FQ === 'earth' && (TQ === 'mars' || TQ === 'mercury' || TQ === 'neptune' || TQ === 'saturn' || TQ === 'venus')) || (FQ === 'jupiter' && (TQ === 'earth' || TQ === 'mercury' || TQ === 'neptune' || TQ === 'saturn' || TQ === 'uranus')) || (FQ === 'mars' && (TQ === 'earth' || TQ === 'jupiter' || TQ === 'mercury' || TQ === 'neptune' || TQ === 'saturn' || TQ === 'uranus')) || (FQ === 'neptune' && (TQ === 'earth' || TQ === 'jupiter' || TQ === 'mars' || TQ === 'saturn' || TQ === 'venus')) || (FQ === 'saturn' && (TQ === 'jupiter' || TQ === 'mars' || TQ === 'mercury' || TQ === 'uranus' || TQ === 'venus')) || (FQ === 'uranus' && (TQ === 'earth' || TQ === 'jupiter' || TQ === 'mars' || TQ === 'mercury' || TQ === 'venus')) || (FQ === 'venus' && (TQ === 'jupiter' || TQ === 'mars' || TQ === 'neptune' || TQ === 'saturn' || TQ === 'uranus')) || (FQ === 'mercury' && (TQ === 'earth' || TQ === 'jupiter' || TQ === 'mars' || TQ === 'neptune' || TQ === 'saturn' || TQ === 'uranus'))) {
        return (
            <h2>{dateQuery ? <div>
                <div>{<ChangeDate from={fromQuery} to={toQuery} date={dateQuery} />}</div>
                {flights.length > 0 ? <ConnectingFlightCard key={"unique"} flights={flights} from={fromQuery} to={toQuery} /> : <div className="false-text">{`Sorry, no flights for ${fromQuery} - ${toQuery} on ${dateQuery}!`}</div>} </div> :
                <Custom400Error bigText={'TRY AGAIN!'} smallText={'FOR CONNECTING FLIGHTS, PLEASE SELECT A DATE!'} />}
            </h2>
        )
    } else
        return (
            <Custom400Error bigText={`SORRY, WE DON'T OFFER THESE ROUTES`} smallText={`${fromQuery} => ${toQuery}`} />
        )
};

export default SearchResult;