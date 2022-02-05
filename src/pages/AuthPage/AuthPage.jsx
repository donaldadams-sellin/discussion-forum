import { useNavigate } from 'react-router-dom';
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function AuthPage({ setUser }) {
    const navigate = useNavigate();
    
    function handleLogin(user){
        setUser(user)
        navigate('/')
    }
    
    return (
        <main>
            <h1>AuthPage</h1>
            <SignUpForm handleLogin={handleLogin} />
            <LoginForm handleLogin={handleLogin} />
        </main>
    );
}