import React, { createContext, useState, useEffect } from "react";

export const ValidityContext = createContext({
    isValid: true,
    setValidity: () => { },
    time: '',
    setTime: () => { }
});

export const ValidityProvider = ({ children }) => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const getData = () => {
            fetch('http://localhost:4000/time')
                .then((response) => response.json())
                .then((result) => { setTime(result) })
                .catch((error) => console.log("An error occured!" + error))
        }
        getData();

        const interval = setInterval(() => {
            getData();
        }, 60000)
        return () => clearInterval(interval)
    }, [time]);

    return (
        <ValidityContext.Provider value={{ time }}>{children}</ValidityContext.Provider>
    );
};