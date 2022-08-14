import { useDispatch, useSelector } from 'react-redux'

import { ReactComponent as Icon } from './svg.svg';
import './open-hamburger.styles.scss';

import { setIsMenuOpen } from '../../../../../store/history/history.action';
import { selectIsMenuOpen } from '../../../../../store/history/history.selector';

/** Icon for the hamburger menu in mobile view, uses a setter and a selector to check and set whether the icon is open or not */
const HamburgerOpenIcon = () => {
    const isMenuOpen = useSelector(selectIsMenuOpen);
    const dispatch = useDispatch();

    const toggleIsMenuOpen = () => {
        dispatch(setIsMenuOpen(!isMenuOpen))
    }

    return (
        <div className={`hamburger-icon-container ${isMenuOpen ? 'toggled-icon' : ''}`}>
            <Icon className='icon' onClick={toggleIsMenuOpen} />
        </div>
    )
};

export default HamburgerOpenIcon;