export default function capitalizeFirst(string) {
    const returned = string.toLowerCase();
    return returned.charAt(0).toUpperCase() + returned.slice(1);
}