import "./sign-in-form.styles.scss";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../context/user.context";
import { useState, useContext } from "react";

const defaultFormFields = {
    email: '',
    password: ''
};

const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const { setCurrentUser } = useContext(UserContext);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
            setFormFields(defaultFormFields);
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };
    return (
        <div className="sign-in-containers">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="text" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button buttonType="google" type="button" onClick={logGoogleUser}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;