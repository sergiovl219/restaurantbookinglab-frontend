import './App.css';

import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './components/Login';
import HomePage from './components/HomePage';
import TicketsList from "./components/TicketsList";
import Account from "./components/Account";

import { selectIsLoggedIn } from './store/slices/authSlice';


function Navbar() {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <nav className="sidebar">
            <ul>
                {isLoggedIn && (
                    <>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/account">Account</Link>
                        </li>
                    </>
                )}
                {!isLoggedIn && (
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                )}
                <li>
                    <Link to="/ticketsList">Tickets List</Link>
                </li>
            </ul>
        </nav>
    );
}

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="main-content">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/ticketsList" element={<TicketsList />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
