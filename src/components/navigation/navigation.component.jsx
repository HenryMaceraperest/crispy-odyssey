import React, { Fragment, useContext } from "react";
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as NavLogo } from '../../assets/navlogo.svg';
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import './navigation.styles.scss';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'><NavLogo className="logo" /></Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>Shop</Link>
                    {currentUser ? (<span className="nav-link" onClick={signOutUser}>Sign Out</span>) :
                        <Link className="nav-link" to='/auth'>Sign In</Link>}
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;