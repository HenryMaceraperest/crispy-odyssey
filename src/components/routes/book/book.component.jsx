import React, { useContext, useState } from 'react';
import axios from 'axios';

import { BookingDataContext } from '../../../contexts/book-item.context';

import './book.styles.scss';

const BookingPage = () => {
    const { bookingData } = useContext(BookingDataContext);

    // bookingData contains id, from, to, flightDistance, startDate, endDate, travelTime, price, flightCompany
    const { flightFromTos, from, to, id, flightDistance, startDate, endDate, travelTime, price, flightCompany } = bookingData;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        const data = {
            from: from,
            to: to,
            distance: flightDistance,
            startDate: startDate,
            endDate: endDate,
            flightDuration: travelTime,
            cost: price,
            company: flightCompany,
            flightRoutes: flightFromTos,
            firstName: firstName,
            lastName: lastName,
            email: email
        }

        axios
            .post('http://localhost:4000/booking', data)
            .then((res) => { console.log(res) })
            .catch((err) => { console.log(err) });
    }

    return (
        <div>
            <form action="/booking" method="post" onSubmit={submitHandler}>
                <div className='flight-data'>
                    <p>{console.log(id)}</p>
                    <label htmlFor="from" className='form-label'>From: </label>
                    <p className='form-data'>{from.toUpperCase()}</p>
                    <label htmlFor="to" className='form-label'>To: </label>
                    <p className='form-data'>{to.toUpperCase()}</p>
                    <label htmlFor="flight-distance" className='form-label'>Distance: </label>
                    <p className='form-data'>{flightDistance} km</p>
                    <label htmlFor="start-date" className='form-label'>Start: </label>
                    <p className='form-data'>{startDate}</p>
                    <label htmlFor="end-date" className='form-label'>End: </label>
                    <p className='form-data'>{endDate}</p>
                    <label htmlFor="travel-time" className='form-label'>Total travel time: </label>
                    <p className='form-data'>{travelTime}</p>
                    <label htmlFor="price" className='form-label'>Price: </label>
                    <p className='form-data'>${price}</p>
                    <label htmlFor="company-name" className='form-label'>Company name(s): </label>
                    <div className='form-data'>{flightCompany.map(x => <p key={x}>{x}</p>)}</div>
                    {flightFromTos ? <div><label htmlFor="routes" className='form-label'>Routes: </label>
                        <div className='form-data'>{flightFromTos.map(flight => <p key={flight.flightFrom}>{flight.flightFrom} - {flight.flightTo}</p>)}</div></div> : ''}
                    <label htmlFor="first-name" className='form-label'>First name(s): </label>
                    <input className='form-input' type="text" name="first-name" id="first-name" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                    <label htmlFor="last-name" className='form-label'>Last name(s): </label>
                    <input className='form-input' type="text" name="last-name" id="last-name" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                    <label htmlFor="email" className='form-label'>Email: </label>
                    <input className='form-input' type="email" name="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>

                <button className='form-button' type='submit'>Book Flight!</button>
            </form>
        </div>
    )
};

export default BookingPage;