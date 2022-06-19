import './booking-card-data.styles.scss';

/** Component that creates a div with two spans inside, takes attributes: divClassname(as the className of the div), spanClassName(as the className of the spans), spanText(the top span with the title of the span), & spanData(displays the data underneath the spanText) */
const BookingCardData = ({ divClassName, spanClassName, spanText, spanData }) => {

    return (
        <div className={divClassName}>
            <span className={spanClassName}>{spanText}</span>
            <span className={spanClassName}>{spanData}</span>
        </div>
    )
}

export default BookingCardData;