import React, { Fragment } from "react";
import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCurrentUser } from "../../../../store/user/user.selector";
import { selectIsHistoryOpen } from "../../../../store/history/history.selector";

import { ReactComponent as NavLogo } from '../../../../assets/navlogo.svg';
import { signOutUser } from "../../../../utils/firebase/firebase.utils";
import HistoryIcon from "../../small-components/history-icon/history-icon.component";
import HistoryScroll from "../../small-components/history-scroll/history-scroll.component";

import './navigation.styles.scss';

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isHistoryOpen = useSelector(selectIsHistoryOpen);

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'><NavLogo className="logo" /></Link>
                <div className="nav-links-container">
                    {currentUser ? (<Link className="nav-link" to='/mybookings'>My bookings</Link>) :
                        ''}
                    <Link className="nav-link" to='/find-booking'>Find Booking</Link>
                    <Link className="nav-link" to='/directflights'>Direct Flights</Link>
                    {currentUser ? (<span className="nav-link" onClick={signOutUser}>Sign Out</span>) :
                        <Link className="nav-link" to='/auth'>Sign In</Link>}
                    <HistoryIcon />
                </div>
                {isHistoryOpen ? <HistoryScroll /> : ''}
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;