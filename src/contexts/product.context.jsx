import React, { createContext, useState, useEffect } from "react";

const ProductsContext = createContext({
    products: [],
    setProducts: () => { }
});

const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        async function getData() {
            await fetch('http://localhost:4000')
                .then((response) => response.json())
                .then((result) => setProducts(result))
                .catch((error) => console.log("An error occured!" + error));
        };

        getData();

    }, [setProducts]);

    return (
        <ProductsContext.Provider value={{ products }}>{children}</ProductsContext.Provider>
    );
};

export { ProductsProvider, ProductsContext };