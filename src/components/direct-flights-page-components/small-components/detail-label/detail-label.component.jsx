import React from "react";
import './detail-label.styles.scss';

export const DetailLabel = ({ mainText, subText }) => {
    return (
        <div className="detail-label">
            <h4>{mainText}</h4>
            <p>{subText}</p>
        </div>
    )
};