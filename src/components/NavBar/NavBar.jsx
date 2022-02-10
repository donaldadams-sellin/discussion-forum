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
            <Link to="/">Home</Link>
            &nbsp; | &nbsp;
            {user ?
                <>
                    <span>Welcome, {user.name}</span>
                    &nbsp; | &nbsp;
                    <Link onClick={handleLogOut} to="">Log Out</Link>
                </>
                :
                <>
                    <Link to="/login">Log In and Sign Up</Link>
                </>}

        </nav>
        </>
    );
}