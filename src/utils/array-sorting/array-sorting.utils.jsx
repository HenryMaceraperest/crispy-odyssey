export const sortByPrice = (array) => {
    // array must contain arrayItem.price
    array.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
};

export const sortByFlightStart = (array) => {
    // array must contain arrayItem.flightStart
    array.sort((a, b) => { return new Date(a.flightStart) - new Date(b.flightStart) })
};

export const sortByCompanyName = (array) => {
    // array must contain arrayItem.company.name
    array.sort((a, b) => {
        const txtA = a.company.name.toUpperCase();
        const txtB = b.company.name.toUpperCase();
        return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0
    })
};

export const sortByCompanyName2 = (array) => {
    // array must contain arrayItem.company.name
    array.sort((a, b) => a.company.name.toLowerCase().localeCompare(b.company.name.toLowerCase()))
};