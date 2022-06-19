import React, { Fragment } from "react";
import { useSelector } from 'react-redux'

import HistoryScrollCard from "../history-scroll-card/history-scroll-card.components";
import { selectHistoryItems } from "../../../../store/history/history.selector";

import './history-scroll.styles.scss';

/** HistoryScroll component that displays all the items/bookings that the user has clicked on */
const HistoryScroll = () => {
    const historyItems = useSelector(selectHistoryItems);
    // reversed history items so that the most recently viewed items would be first in the array
    const revHistoryItems = [...historyItems].reverse();


    return (
        <Fragment>
            <div className="history-scroll-container">
                {revHistoryItems.map(item => (
                    <HistoryScrollCard key={item.id} item={item} />
                ))}
            </div>
        </Fragment>
    )
}

export default HistoryScroll;