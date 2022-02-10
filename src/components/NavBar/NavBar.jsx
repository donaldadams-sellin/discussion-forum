import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }

    return (
        <>
        <nav className='NavBar'>
            <Link className='btn' to="/">Home</Link>
            &nbsp; | &nbsp;
            {user ?
                <>
                    <span>Welcome, {user.name}</span>
                    &nbsp; | &nbsp;
                    <Link className='btn' onClick={handleLogOut} to="">Log Out</Link>
                </>
                :
                <>
                    <Link className='btn' to="/login">Log In and Sign Up</Link>
                </>}

        </nav>
        </>
    );
}