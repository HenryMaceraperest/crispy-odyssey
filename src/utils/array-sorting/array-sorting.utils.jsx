export const sortByPriceDesc = (array) => {
    // array must contain arrayItem.price
    array.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
};

export const sortByPriceAsc = (array) => {
    // array must contain arrayItem.price
    array.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
};

export const sortByDateEarly = (array) => {
    // array must contain arrayItem.flightStart
    array.sort((a, b) => { return new Date(a.flightStart) - new Date(b.flightStart) })
};

export const sortByDateLate = (array) => {
    // array must contain arrayItem.flightStart
    array.sort((a, b) => { return new Date(b.flightStart) - new Date(a.flightStart) })
};

export const sortByDistanceDesc = (array) => {
    // array must contain arrayItem.distance
    array.sort((a, b) => parseFloat(b.distance) - parseFloat(a.distance))
};

export const sortByDistanceAsc = (array) => {
    // array must contain arrayItem.distance
    array.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
};

export const sortByTravelTimeDesc = (array) => {
    // array must contain arrayItem.travelTimeMS
    array.sort((a, b) => parseFloat(b.travelTimeMS) - parseFloat(a.travelTimeMS))
};

export const sortByTravelTimeAsc = (array) => {
    // array must contain arrayItem.travelTimeMS
    array.sort((a, b) => parseFloat(a.travelTimeMS) - parseFloat(b.travelTimeMS))
};