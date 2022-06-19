import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { selectBookings } from '../../../store/booking/booking.selector';
import { setBookingID } from '../../../store/booking/booking.action';
import ValidBookingForm from '../../../components/bookings-components/make-booking-page-components/main-components/valid-booking-form/valid-booking-form.component';
import InvalidBookingForm from '../../../components/bookings-components/make-booking-page-components/main-components/invalid-booking-form/invalid-booking-form.component';

// booking page that checks whether the validUntil date is still earlier than the current date & based on the result shows the page to make the booking or a page that suggests to check for a new flight
const MakeBookingPage = () => {
    const bookingData = useSelector(selectBookings);

    const { validityDate } = bookingData;

    const dispatch = useDispatch();

    useEffect(() => {

        // using an external service, generates a random ID for each flight booking, every time you refresh/view different flight, it generates a new id
        const getRandomID = async () => {
            await axios.post(process.env.REACT_APP_RANDOM_ID_API, [
                {
                    "jsonrpc": "2.0",
                    "method": "generateStrings",
                    "params": {
                        "apiKey": process.env.REACT_APP_RANDOM_ID_API_KEY,
                        "n": 1,
                        "length": 6,
                        "characters": "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789",
                        "replacement": true,
                        "pregeneratedRandomization": null
                    },
                    "id": 1378
                }
            ], [
                { headers: { 'Content-Type': 'application/JSON' } }
            ])
                .then((result) => dispatch(setBookingID(result.data[0].result.random.data[0])))
                .catch((e) => console.log(e))
        };
        getRandomID();
    }, [dispatch]);

    const timeNow = new Date().toISOString();
    let isValid = false;
    if (timeNow < validityDate) {
        isValid = true;
    } else {
        isValid = false;
    }

    if (isValid) {
        return (
            <ValidBookingForm />
        )
    } else {
        return (
            <InvalidBookingForm />
        )
    }
};

export default MakeBookingPage;