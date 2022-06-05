import './booking-card-data.styles.scss';

const BookingCardData = ({ divClassName, spanClassName, spanText, spanData }) => {

    return (
        <div className={divClassName}>
            <span className={spanClassName}>{spanText}</span>
            <span className={spanClassName}>{spanData}</span>
        </div>
    )
}

export default BookingCardData;