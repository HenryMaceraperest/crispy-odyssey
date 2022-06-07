import './sorting-span.styles.scss';

const SortingSpan = ({ title, onClick1, onClick2, text1, text2 }) => {

    return (
        <span className='sorting-span'>
            <p>{title}</p>
            <button className='sorting-button' onClick={onClick1}>{text1}</button>
            <button className='sorting-button' onClick={onClick2}>{text2}</button>
        </span>
    )
}

export default SortingSpan;