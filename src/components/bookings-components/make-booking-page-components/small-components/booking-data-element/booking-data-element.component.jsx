import './booking-data-element.styles.scss';

const BookingDataElement = ({ data, labelText, htmlFor }) => {
    return (
        <span>
            <label htmlFor={htmlFor} className='form-labell'>{labelText}</label>
            <p className='form-data'>{data}</p>
        </span>
    )
};

export default BookingDataElement;