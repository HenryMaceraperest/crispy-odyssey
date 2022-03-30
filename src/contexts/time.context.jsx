import React, { createContext, useState, useEffect } from "react";

const TimeContext = createContext();

const TimeProvider = ({ children }) => {
    const [time, setTime] = useState();


    useEffect(() => {
        async function getData() {
            await fetch('http://localhost:4000/time')
                .then((response) => response.json())
                .then((result) => setTime(result))
                .catch((error) => console.log("An error occured!" + error));
        };

        getData();

    }, [setTime]);

    return (
        <TimeContext.Provider value={{ time }}>{children}</TimeContext.Provider>
    );
};

export { TimeProvider, TimeContext };