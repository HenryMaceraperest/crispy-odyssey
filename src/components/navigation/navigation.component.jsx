import React, { Fragment } from "react";
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as NavLogo } from '../../assets/navlogo.svg';

import './navigation.styles.scss';

const Navigation = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'><NavLogo className="logo" /></Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/signin'>Sign In</Link>
                    <Link className="nav-link" to='/shop'>Shop</Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;