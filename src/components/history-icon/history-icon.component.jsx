import { useSelector, useDispatch } from 'react-redux'

import { ReactComponent as Icon } from '../../assets/history-icon.svg';
import './history-icon.styles.scss';

import { setIsHistoryOpen } from '../../store/history/history.action';
import { selectIsHistoryOpen, selectHistoryCount } from '../../store/history/history.selector';

const HistoryIcon = () => {
    const dispatch = useDispatch();
    const isHistoryOpen = useSelector(selectIsHistoryOpen);
    const historyCount = useSelector(selectHistoryCount);

    const toggleIsHistoryOpen = () => dispatch(setIsHistoryOpen(!isHistoryOpen));

    return (
        <div className='history-icon-container' onClick={toggleIsHistoryOpen}>
            <Icon className='icon' />
            <span className='item-count'>{historyCount}</span>
        </div>
    )
};

export default HistoryIcon;