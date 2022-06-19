import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectCurrentUser } from '../../store/user/user.selector';

import SignUpForm from '../../components/authenticate-page-components/main-components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/authenticate-page-components/main-components/sign-in-form/sign-in-form.component';

import './authenticate.styles.scss';

/** Authenticate Component, has sign-up and sign-in forms in it */
const Authenticate = () => {
    const currentUser = useSelector(selectCurrentUser);
    return (<div className='authentication-outer-container'>{!currentUser ?
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
        </div> : <Navigate to={'/'} />}
    </div>)
}

export default Authenticate;