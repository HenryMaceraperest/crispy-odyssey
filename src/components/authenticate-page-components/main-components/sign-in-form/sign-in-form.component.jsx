import { useState } from "react";

import FormInput from "../../small-components/form-input/form-input.component";
import Button from "../../small-components/button/button.component";

import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss';

// sign-in is with email & password
const defaultFormFields = {
    email: '',
    password: ''
};

/** Sign-in component that allows the user to sign in with email & password || with google pop-up authentication */
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    // resetFormFields to handle the form fields after submitting
    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    };


    // a function from firebase, which provides a google login popup
    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {
            if (error.code === "auth/wrong-password" || "auth/user-not-found") {
                alert("Incorrect email or password!")
            }
            console.log(error);
        }
    };


    const handleChange = (event) => {
        const { name, value } = event.target;

        // useState for the email and password
        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an acccount?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Email" required type="email" onChange={handleChange} name="email" value={email} />

                <FormInput label="Password" required type="password" onChange={handleChange} name="password" value={password} />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={'google'} onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
};

export default SignInForm;