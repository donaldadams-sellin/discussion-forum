import { useState } from 'react';
import * as usersService from '../../utilities/users-service';

export default function LoginForm({ handleLogin }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the login service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      handleLogin(user);
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  }

  return (
    <>
      <form autoComplete="off" className="auth-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="text" name="email" maxLength="25" value={credentials.email} onChange={handleChange} required />
        <label>Password</label>
        <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
        <button type="submit">LOG IN</button>
      </form>
      <p>{error}</p>
    </>
  );
}