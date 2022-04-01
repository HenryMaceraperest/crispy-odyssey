import React, { Fragment, useContext } from "react";
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as NavLogo } from '../../assets/navlogo.svg';

import { UserContext } from "../../contexts/user.context";
import { HistoryItemsContext } from "../../contexts/history-items.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";
import HistoryIcon from "../history-icon/history-icon.component";
import HistoryScroll from "../history-scroll/history-scroll.component";

import './navigation.styles.scss';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isHistoryOpen } = useContext(HistoryItemsContext);

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'><NavLogo className="logo" /></Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>Shop</Link>
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