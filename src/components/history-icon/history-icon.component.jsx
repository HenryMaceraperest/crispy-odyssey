import { useContext } from 'react';

import { ReactComponent as Icon } from '../../assets/history-icon.svg';
import './history-icon.styles.scss';

import { HistoryItemsContext } from '../../contexts/history-items.context';

const HistoryIcon = () => {

    const { isHistoryOpen, setIsHistoryOpen, historyCount } = useContext(HistoryItemsContext);

    const toggleIsHistoryOpen = () => setIsHistoryOpen(!isHistoryOpen);

    return (
        <div className='history-icon-container' onClick={toggleIsHistoryOpen}>
            <Icon className='icon' />
            <span className='item-count'>{historyCount}</span>
        </div>
    )
};

export default HistoryIcon;