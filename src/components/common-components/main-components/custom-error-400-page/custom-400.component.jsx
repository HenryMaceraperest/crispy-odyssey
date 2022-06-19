import { Link } from 'react-router-dom';

import './custom-400.styles.scss';

/** Error compnent for a custom error, takes two attributes: bigText(for the error code), & smallText(to specify why the error happened or what to do) */
const Custom400Error = ({ bigText, smallText }) => {
    return (
        <div className='default-div'>
            <p className='text-background'>{bigText}</p>
            <p className='text-background-small'>{smallText}</p>
            <br />
            <Link className='home-link' to={'/'}>HOMEPAGE</Link>
        </div>
    )
};

export default Custom400Error;