import { useNavigate } from 'react-router-dom';
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import './AuthPage.css';

export default function AuthPage({ setUser }) {
    const navigate = useNavigate();

    function handleLogin(user) {
        setUser(user)
        navigate('/')
    }

    return (
        <>
            {/* <h1>AuthPage</h1> */}
            <div className='form-container'>
                <p>Returning user?  Log In!</p>
                <LoginForm handleLogin={handleLogin} />
                <p>New User? Sign Up!</p>
                <SignUpForm handleLogin={handleLogin} />
            </div>
        </>
    );
}