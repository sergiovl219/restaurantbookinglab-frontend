import React, { useState } from 'react';
import { login, userinfo } from "../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setIsLoggedIn, selectIsLoggedIn } from "../store/slices/authSlice";
import { setUserInfo } from "../store/slices/userInfoSlice";

const Login: React.FC = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);

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
                    if (token) {
                        try {
                            const response = await userinfo(token);
                            dispatch(setUserInfo(response.data));
                            dispatch(setIsLoggedIn(true));
                        } catch (error) {
                            console.error('Error getting user info:', error);
                        }
                    }
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
            {isLoggedIn ? (
                <div className="success">Login successful!</div>
            ) : (
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
            )}
        </div>
    );
};

export default Login;
