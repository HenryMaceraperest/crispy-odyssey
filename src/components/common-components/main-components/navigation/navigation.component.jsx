import React, { Fragment } from "react";
import { Outlet, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentUser } from "../../../../store/user/user.selector";
import { selectIsHistoryOpen, selectIsMenuOpen } from "../../../../store/history/history.selector";
import { setIsMenuOpen } from "../../../../store/history/history.action";

import { ReactComponent as NavLogo } from '../../../../assets/navlogo.svg';
import { signOutUser } from "../../../../utils/firebase/firebase.utils";
import HistoryIcon from "../../small-components/history-icon/history-icon.component";
import HistoryScroll from "../../small-components/history-scroll/history-scroll.component";
import HamburgerOpenIcon from "../../small-components/hamburger-icons/open-hamburger/open-hamburger.component";

import './navigation.styles.scss';

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isHistoryOpen = useSelector(selectIsHistoryOpen);
    const isMenuOpen = useSelector(selectIsMenuOpen)

    const dispatch = useDispatch();

    const toggleIsMenuOpen = () => {
        dispatch(setIsMenuOpen(!isMenuOpen))
    }
    const handleNavClick = () => {
        dispatch(setIsMenuOpen(false))
    }
    const handleSignOutClick = () => {
        signOutUser();
        handleNavClick();
    }

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'><NavLogo className="logo" /></Link>
                <HamburgerOpenIcon onClick={toggleIsMenuOpen} />
                <div className="nav-links-container">
                    {currentUser ? (<Link onClick={handleNavClick} className={`nav-link ${isMenuOpen ? 'mobile-open-nav-link' : ''}`} to='/mybookings'>My bookings</Link>) :
                        ''}
                    <Link onClick={handleNavClick} className={`nav-link ${isMenuOpen ? 'mobile-open-nav-link' : ''}`} to='/find-booking'>Find Booking</Link>
                    <Link onClick={handleNavClick} className={`nav-link ${isMenuOpen ? 'mobile-open-nav-link' : ''}`} to='/directflights'>Direct Flights</Link>
                    {currentUser ? (<span className={`nav-link ${isMenuOpen ? 'mobile-open-nav-link' : ''}`} onClick={handleSignOutClick}>Sign Out</span>) :
                        <Link onClick={handleNavClick} className={`nav-link ${isMenuOpen ? 'mobile-open-nav-link' : ''}`} to='/auth'>Sign In</Link>}
                </div>
                <HistoryIcon />

                {isHistoryOpen ? <HistoryScroll /> : ''}
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;