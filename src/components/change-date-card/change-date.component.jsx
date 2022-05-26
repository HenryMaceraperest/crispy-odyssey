import { useNavigate } from 'react-router-dom';

import './change-date.styles.scss';

const ChangeDate = ({ from, to, date }) => {
    const timeNow = new Date();
    const navigate = useNavigate();
    const oldDate1 = new Date(date);
    const oldDate2 = new Date(date);

    oldDate1.setDate(oldDate1.getDate() + 1);
    oldDate2.setDate(oldDate2.getDate() - 1);
    const nextDate = oldDate1.toISOString().split('T')[0];
    const previousDate = oldDate2.toISOString().split('T')[0];

    const previousDayClickHandler = () => {
        navigate(`/search?from=${from}&to=${to}&date=${previousDate}`)
    };

    const nextDayClickHandler = () => {
        navigate(`/search?from=${from}&to=${to}&date=${nextDate}`)
    };

    return (
        <div className='main-div'>
            <p className='paragraph'>No flights for this route and date, please check another date!</p>
            {timeNow < oldDate1 ? <button className='button' onClick={() => previousDayClickHandler()}>Previous day</button> : ''}
            <button className='button' onClick={() => nextDayClickHandler()}>Next day</button>
        </div>
    )
}

export default ChangeDate;