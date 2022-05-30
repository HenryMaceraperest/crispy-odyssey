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
            {timeNow < oldDate1 ? <button className='button' onClick={() => previousDayClickHandler()}>Previous day, {previousDate}</button> : ''}
            <button className='button' onClick={() => nextDayClickHandler()}>Next day, {nextDate}</button>
        </div>
    )
}

export default ChangeDate;