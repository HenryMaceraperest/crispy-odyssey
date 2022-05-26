import axios from "axios";

import { useDispatch } from "react-redux";
import { setBookingID } from "../../store/booking/booking.action";

export const getRandomID = () => {
    axios.post('https://api.random.org/json-rpc/4/invoke', [
        {
            "jsonrpc": "2.0",
            "method": "generateStrings",
            "params": {
                "apiKey": "8b251143-a233-4436-a5dd-30ec7a9d3be6",
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
        .then((result) => useDispatch(setBookingID(result.data[0].result.random.data[0])))
};
