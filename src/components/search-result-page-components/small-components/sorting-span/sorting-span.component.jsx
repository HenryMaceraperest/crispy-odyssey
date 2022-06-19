import './sorting-span.styles.scss';

/** Component that takes 5 parameters: title(which is the title of the sorting-type), onClick1(the function for the first button's click), text1(text/description for the first button), onClick2(the function for the second button's click), text2(the text/description for the second button) */
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