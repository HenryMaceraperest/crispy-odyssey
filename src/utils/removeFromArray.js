export default function removeFromArray(array, item) {
    let index = array.indexOf(item);
    return [
        ...array.slice(0, index),
        ...array.slice(index + 1)
    ];
};