import React, { useState } from 'react';
import {login} from "../services/authService";
import {useDispatch, useSelector} from "react-redux";
import {setToken, selectToken} from "../store/slices/authSlice";

const Login: React.FC = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const saved_token = useSelector(selectToken);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Please fill all the fields.');
        } else {
            try {
                const response = await login(username, password);
                if (response.status === 200) {
                    const token = response.data.token;
                    dispatch(setToken(token));
                } else {
                    setError('Login failed. Verify your credentials.');
                }
            } catch (error) {
                setError('Error in the request to the server. Try again.');
            }
        }
    };
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User Name:</label>
                    <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit">Login</button>
            </form>
            {saved_token && <div><strong>Token: {saved_token}</strong></div>}
        </div>
    );
};

export default Login;
