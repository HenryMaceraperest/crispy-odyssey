import React, { createContext, useState, useEffect } from "react";

export const ValidityContext = createContext({
    isValid: true,
    setValidity: () => { },
    time: '',
    setTime: () => { }
});

export const ValidityProvider = ({ children }) => {
    const [isValid, setValidity] = useState(false);
    const [time, setTime] = useState('');
    useEffect(() => {
        async function getData() {
            await fetch('http://localhost:4000/time')
                .then((response) => response.json())
                .then((result) => setTime(result))
                .catch((error) => console.log("An error occured!" + error));
        };
        getData();
    }, []);

    const timeNow = new Date().toISOString();

    if (time > timeNow) {
        setValidity(true)
    } else {
        setValidity(false)
    }

    return (
        <ValidityContext.Provider value={{ isValid }}>{children}</ValidityContext.Provider>
    );
};