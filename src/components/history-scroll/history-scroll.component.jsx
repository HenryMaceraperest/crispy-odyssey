import React, { Fragment, useContext } from "react";

import HistoryScrollCard from "../history-scroll-card/history-scroll-card.components";
import { HistoryItemsContext } from "../../contexts/history-items.context";

import './history-scroll.styles.scss';

const HistoryScroll = () => {
    const { historyItems } = useContext(HistoryItemsContext);
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