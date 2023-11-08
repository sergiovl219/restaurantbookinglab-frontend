import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import OwnerHome from './components/OwnerHome';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from './store/slices/authSlice';

function Navbar() {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/ownerHome">Owner Home</Link>
                </li>
                {!isLoggedIn && (
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/ownerHome" element={<OwnerHome />} />
            </Routes>
        </div>
    );
}

export default App;
