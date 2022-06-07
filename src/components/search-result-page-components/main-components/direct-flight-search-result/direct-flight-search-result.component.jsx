import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ChangeDate from '../change-date/change-date.component';
import DirectFlightCard from '../direct-flight-card/direct-flight-card.component';
import SortingSpan from '../../small-components/sorting-span/sorting-span.component';

import { selectSearchResult } from '../../../../store/result/result.selector';
import { setSearchResult } from '../../../../store/result/result.action';

import './direct-flight-search-result.styles.scss';

const DirectFlightSearchResult = ({ from, to, date }) => {
    const searchResultFlights = useSelector(selectSearchResult);
    const dispatch = useDispatch();

    searchResultFlights.forEach(flight => {
        const start =
            new Date(flight.flightStart);
        const end = new Date(flight.flightEnd);
        const travelTimeMS = end - start;
        flight.travelTimeMS = travelTimeMS;
    });

    const sortTravelTimeClickHandlerDesc = () => {
        const sortedFlights = [...searchResultFlights].sort((a, b) => parseFloat(b.travelTimeMS) - parseFloat(a.travelTimeMS));
        dispatch(setSearchResult(sortedFlights))
    };

    const sortTravelTimeClickHandlerAsc = () => {
        const sortedFlights = [...searchResultFlights].sort((a, b) => parseFloat(a.travelTimeMS) - parseFloat(b.travelTimeMS));
        dispatch(setSearchResult(sortedFlights))
    };

    const sortDateClickHandlerDesc = () => {
        const sortedFlights = [...searchResultFlights].sort((a, b) => { return new Date(a.flightStart) - new Date(b.flightStart) });
        dispatch(setSearchResult(sortedFlights))
    };

    const sortDateClickHandlerAsc = () => {
        const sortedFlights = [...searchResultFlights].sort((a, b) => { return new Date(b.flightStart) - new Date(a.flightStart) });
        dispatch(setSearchResult(sortedFlights))
    };

    const sortPriceClickHandlerDesc = () => {
        const sortedFlights = [...searchResultFlights].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        dispatch(setSearchResult(sortedFlights))
    };

    const sortPriceClickHandlerAsc = () => {
        const sortedFlights = [...searchResultFlights].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        dispatch(setSearchResult(sortedFlights))
    };
    const [searchTerm, setSearchTerm] = useState('');

    const flights = searchResultFlights.filter(flight => flight.company.name.toLowerCase().includes(searchTerm));

    const onSearchChange = (event) => { setSearchTerm(event.target.value.toLowerCase()) };

    return (
        <div className="search-body">
            <h1 className="title">From {from.toUpperCase()} To {to.toUpperCase()}</h1>
            <div>{date ? <ChangeDate from={from} to={to} date={date} /> : ''}</div>
            <div className='sorting-div'>
                <span className='sorting-span'>
                    <p>Company:</p>
                    <input className="sorting-search-box" placeholder="Search" type="text" name="company-search" onChange={onSearchChange} />
                </span>
                <SortingSpan onClick1={sortPriceClickHandlerAsc} onClick2={sortPriceClickHandlerDesc} title={'Price:'} text1={'Ascending'} text2={'Descending'} />
                <SortingSpan onClick1={sortDateClickHandlerAsc} onClick2={sortDateClickHandlerDesc} title={'Date:'} text1={'Later first'} text2={'Earlier first'} />
                <SortingSpan onClick1={sortTravelTimeClickHandlerAsc} onClick2={sortTravelTimeClickHandlerDesc} title={'Travel time:'} text1={'Ascending'} text2={'Descending'} />
            </div>
            <h2>{flights.length > 0 ? flights.map(flight =>
                <DirectFlightCard key={flight.id} flight={flight} from={from} to={to} />) : <div className="false-text">{`Sorry, no flights available!`}</div>}</h2>
        </div>
    )
}

export default DirectFlightSearchResult;