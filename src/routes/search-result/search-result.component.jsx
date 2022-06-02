import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from "axios";

import './search-result.styles.scss';

import DirectFlightCard from "../../components/direct-flight-card/direct-flight-card.component";
import ConnectingFlightCard from "../../components/connecting-flight-card/connecting-flight-card.component";
import Custom400Error from "../../components/404-pages/custom-400/custom-400.component";
import ChangeDate from "../../components/change-date-card/change-date.component";

import { setValidity } from "../../store/validity/validity.action";

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
        }, 60000)
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
                    const response = await axios.get(`http://localhost:4000/searchresult?from=${fromQuery}&to=${toQuery}`);
                    setOGFlights(response.data);
                } else {
                    await axios.get(`http://localhost:4000/searchresult?from=${fromQuery}&to=${toQuery}&date=${dateQuery}`)
                        .then(response => setOGFlights(response.data))
                        .catch(function (error) {
                            if (error.response) {
                                console.log(error.response.data);
                                console.log(error.response.status);
                            } else {
                                console.log('Error', error.message);
                            }
                            console.log(error.config);
                        });
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
                <h2>{flights.length > 0 ? flights.map(flight =>
                    <DirectFlightCard key={flight.id} flight={flight} from={fromQuery} to={toQuery} />) : <div className="false-text">{`Sorry, no flights available!`}</div>}</h2>
            </div>
        )

    } else if (!dateQuery && ((FQ === 'earth' && (TQ === 'mars' || TQ === 'mercury' || TQ === 'neptune' || TQ === 'saturn' || TQ === 'venus')) || (FQ === 'jupiter' && (TQ === 'earth' || TQ === 'mercury' || TQ === 'neptune' || TQ === 'saturn' || TQ === 'uranus')) || (FQ === 'mars' && (TQ === 'earth' || TQ === 'jupiter' || TQ === 'mercury' || TQ === 'neptune' || TQ === 'saturn' || TQ === 'uranus')) || (FQ === 'neptune' && (TQ === 'earth' || TQ === 'jupiter' || TQ === 'mars' || TQ === 'saturn' || TQ === 'venus')) || (FQ === 'saturn' && (TQ === 'jupiter' || TQ === 'mars' || TQ === 'mercury' || TQ === 'uranus' || TQ === 'venus')) || (FQ === 'uranus' && (TQ === 'earth' || TQ === 'jupiter' || TQ === 'mars' || TQ === 'mercury' || TQ === 'venus')) || (FQ === 'venus' && (TQ === 'jupiter' || TQ === 'mars' || TQ === 'neptune' || TQ === 'saturn' || TQ === 'uranus')) || (FQ === 'mercury' && (TQ === 'earth' || TQ === 'jupiter' || TQ === 'mars' || TQ === 'neptune' || TQ === 'saturn' || TQ === 'uranus')))) {
        return (
            <Custom400Error bigText={'TRY AGAIN!'} smallText={'FOR CONNECTING FLIGHTS, PLEASE SELECT A DATE!'} />
        )
    } else if ((FQ === 'earth' && (TQ === 'mars' || TQ === 'mercury' || TQ === 'neptune' || TQ === 'saturn' || TQ === 'venus')) || (FQ === 'jupiter' && (TQ === 'earth' || TQ === 'mercury' || TQ === 'neptune' || TQ === 'saturn' || TQ === 'uranus')) || (FQ === 'mars' && (TQ === 'earth' || TQ === 'jupiter' || TQ === 'mercury' || TQ === 'neptune' || TQ === 'saturn' || TQ === 'uranus')) || (FQ === 'neptune' && (TQ === 'earth' || TQ === 'jupiter' || TQ === 'mars' || TQ === 'saturn' || TQ === 'venus')) || (FQ === 'saturn' && (TQ === 'jupiter' || TQ === 'mars' || TQ === 'mercury' || TQ === 'uranus' || TQ === 'venus')) || (FQ === 'uranus' && (TQ === 'earth' || TQ === 'jupiter' || TQ === 'mars' || TQ === 'mercury' || TQ === 'venus')) || (FQ === 'venus' && (TQ === 'jupiter' || TQ === 'mars' || TQ === 'neptune' || TQ === 'saturn' || TQ === 'uranus')) || (FQ === 'mercury' && (TQ === 'earth' || TQ === 'jupiter' || TQ === 'mars' || TQ === 'neptune' || TQ === 'saturn' || TQ === 'uranus'))) {
        return (
            <h2>
                <div>{<ChangeDate from={fromQuery} to={toQuery} date={dateQuery} />}</div>

                {/* for some reason connecting flights doesnt update the page when you change the date, unlike direct flights */}
                {flights.length > 0 ? <ConnectingFlightCard key={"unique"} flights={flights} from={fromQuery} to={toQuery} /> : <div className="false-text">{`Sorry, no flights for ${fromQuery} - ${toQuery} on ${dateQuery}!`}</div>}
            </h2>
        )
    } else
        return (
            <Custom400Error bigText={`SORRY, WE DON'T OFFER THESE ROUTES`} smallText={`${fromQuery} => ${toQuery}`} />
        )
};

export default SearchResult;