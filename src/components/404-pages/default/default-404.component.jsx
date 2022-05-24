import { Link } from 'react-router-dom';

import './default-404.styles.scss';

const Default404 = ({ from, to }) => {
    return (
        <div className='default-div'>
            <p className='text-background'>404</p>
            <p className='text-background-small'>The page you're looking for is in another galaxy.</p>
            <br />
            <Link className='home-link' to={'/'}>HOMEPAGE</Link>
        </div>
    )
};

export default Default404;