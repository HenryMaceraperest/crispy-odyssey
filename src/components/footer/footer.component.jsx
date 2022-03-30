import React, { Fragment, useContext } from "react";
import { Outlet } from 'react-router-dom';

import FooterCard from "../footer-card/footer-card.components";
import { FooterItemsContext } from "../../contexts/footer-items.context";

import './footer.styles.scss';

const Footer = () => {
    /* let footerArray = [
        {
            from: "Earth",
            to: "Mars",
            startDate: "30.03.2022",
            endDate: "31.03.2022", travelTime: "15h, 30min, 45sec",
            price: 3000
        },
        {
            from: "Mars",
            to: "Jupiter",
            startDate: "31.03.2022",
            endDate: "05.04.2022", travelTime: "5d, 15h, 30min",
            price: 35000
        },
        {
            from: "Earth",
            to: "Neptune",
            startDate: "15.04.2022",
            endDate: "27.04.2022", travelTime: "11d, 07h, 20min",
            price: 58000
        }
    ] */
    const { footerItems } = useContext(FooterItemsContext)
    return (
        <Fragment>
            <Outlet />
            <div className="footer">
                {footerItems.map(item => (
                    <FooterCard key={item.distance} item={item} />
                ))}
            </div>
        </Fragment>
    )
}

export default Footer;