import React from "react";
import './detail-label.styles.scss';

export const DetailLabel = (props) => {
    return (
        <div className="detail-label">
            <h4>{props.mainText}</h4>
            <p>{props.subText}</p>
        </div>
    )
};