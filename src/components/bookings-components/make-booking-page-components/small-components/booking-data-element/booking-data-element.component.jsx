import './booking-data-element.styles.scss';

/** Component that takes data as the form-data, htmlFor as the htmlFor attribute & labelText as the label above the data */
const BookingDataElement = ({ data, labelText, htmlFor }) => {
    return (
        <span>
            <label htmlFor={htmlFor} className={'form-label'}>{labelText}</label>
            <p className='form-data'>{data}</p>
        </span>
    )
};

export default BookingDataElement;