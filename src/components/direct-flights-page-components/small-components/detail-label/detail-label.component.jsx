import React from "react";
import './detail-label.styles.scss';

/** Component that takes two arguments: mainText(the big label text), & subText(the smaller text, usually data) */
export const DetailLabel = ({ mainText, subText }) => {
    return (
        <div className="detail-label">
            <h4>{mainText}</h4>
            <p>{subText}</p>
        </div>
    )
};