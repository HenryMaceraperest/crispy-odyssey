import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './authenticate.styles.scss';

const Authenticate = () => {
    return (
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authenticate;