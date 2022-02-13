import { useState } from 'react';
import { signUp } from '../../utilities/users-service';

export default function SignUpForm({ handleLogin }) {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    });

    function handleChange(evt) {
        setUserData({ ...userData, [evt.target.name]: evt.target.value, error: '' });
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            //remove error and confirm as they don't need to be sent
            const submitData = { ...userData };
            delete submitData.error;
            delete submitData.confirm;
            const user = await signUp(submitData);
            handleLogin(user);
        } catch (e) {
            setUserData({ ...userData, error: e.message })
        }
    }
    const disable = userData.password !== userData.confirm;
    return (
        <>

            <form autoComplete="off" className="auth-form" onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" maxLength="15" value={userData.name} onChange={handleChange} required />
                <label>Email</label>
                <input type="email" name="email" maxLength="25" value={userData.email} onChange={handleChange} required />
                <label>Password</label>
                <input type="password" name="password" value={userData.password} onChange={handleChange} required />
                <label>Confirm</label>
                <input type="password" name="confirm" value={userData.confirm} onChange={handleChange} required />
                <button type="submit" disabled={disable}>SIGN UP</button>
            </form>

            <p>&nbsp;{userData.error}</p>
        </>
    );
}

