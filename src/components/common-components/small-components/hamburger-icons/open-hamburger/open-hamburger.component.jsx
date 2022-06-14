import { useDispatch, useSelector } from 'react-redux'

import { ReactComponent as Icon } from './svg.svg';
import './open-hamburger.styles.scss';

import { setIsMenuOpen } from '../../../../../store/history/history.action';
import { selectIsMenuOpen } from '../../../../../store/history/history.selector';

const HamburgerOpenIcon = () => {
    const isMenuOpen = useSelector(selectIsMenuOpen);
    const dispatch = useDispatch();

    const toggleIsMenuOpen = () => {
        console.log(isMenuOpen)
        dispatch(setIsMenuOpen(!isMenuOpen))
    }

    return (
        <div className={`hamburger-icon-container ${isMenuOpen ? 'toggled-icon' : ''}`}>
            <Icon className='icon' onClick={toggleIsMenuOpen} />
        </div>
    )
};

export default HamburgerOpenIcon;