/** This function calculates the difference between two dates, first argument is the later date, second argument is the earlier date */
export function timeDiff(arrival, departure) {
    let diffInMillisecs = Math.abs(arrival - departure) / 1000;

    const days = Math.floor(diffInMillisecs / 86400);
    const hours = Math.floor(diffInMillisecs / 3600) % 24;
    const minutes = Math.floor(diffInMillisecs / 60) % 60;

    let difference = '';
    if (days > 0) {
        difference += (days === 1) ? `${days} day, ` : `${days} days, `;
    }
    difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;

    difference += (minutes === 0 || minutes === 1) ? `${minutes} minute` : `${minutes} minutes`;

    return difference;
};